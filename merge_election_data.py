"""Merge per-constituency election CSV files into one cleaned, sorted file.

Usage:
    python merge_election_data.py
    python merge_election_data.py --input path/to/election_dataset --output output/final_cleaned_sorted.csv
"""
import argparse
import sys
from pathlib import Path

import pandas as pd

REQUIRED = ["name", "party", "status", "votes"]
EXPECTED_CONSTITUENCIES = 543  # Lok Sabha seats


def load_files(folder: Path) -> list:
    frames = []
    for f in sorted(folder.glob("*.csv")):
        try:
            df = pd.read_csv(f)
        except Exception as e:
            print(f"Skipping {f.name}: {e}")
            continue

        df.columns = df.columns.str.lower().str.strip()
        missing = [c for c in REQUIRED if c not in df.columns]
        if missing:
            print(f"Skipping {f.name}: missing columns {missing}")
            continue

        # Full file name (without .csv) is unique, so same-named constituencies
        # in different states (e.g. Aurangabad, Maharajganj) are NOT merged.
        df["constituency_id"] = f.stem.strip()
        df["constituency"] = f.stem.split("(")[0].strip()
        frames.append(df)
    return frames


def clean(df: pd.DataFrame) -> pd.DataFrame:
    for col in ["name", "party", "status", "constituency", "constituency_id"]:
        df[col] = df[col].astype(str).str.replace(r"\s+", " ", regex=True).str.strip()

    df["party"] = df["party"].str.upper()
    df["status"] = df["status"].str.lower()

    df["votes"] = pd.to_numeric(
        df["votes"].astype(str).str.replace(",", "", regex=False), errors="coerce"
    )
    df = df.dropna(subset=REQUIRED)
    df = df[df["name"].ne("nan")]
    df["votes"] = df["votes"].astype(int)

    df = df.drop_duplicates()
    df = df.sort_values(["constituency_id", "votes"], ascending=[True, False])
    cols = ["constituency", "constituency_id", "name", "party", "status", "votes"]
    return df[cols].reset_index(drop=True)


def validate(df: pd.DataFrame) -> None:
    n = df["constituency_id"].nunique()
    print(f"Constituencies: {n} (expected {EXPECTED_CONSTITUENCIES})")
    if n != EXPECTED_CONSTITUENCIES:
        print("  WARNING: constituency count differs from expected.")

    winners = df[df["status"] == "won"].groupby("constituency_id").size()
    no_winner = set(df["constituency_id"].unique()) - set(winners.index)
    multi = winners[winners > 1]
    if no_winner:
        print(f"  WARNING: no winner in: {sorted(no_winner)}")
    if len(multi):
        print(f"  WARNING: more than one winner in: {list(multi.index)}")
    if not no_winner and not len(multi):
        print("  OK: every constituency has exactly one winner.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", default="data/raw/election_dataset", type=Path)
    parser.add_argument("--output", default="output/final_cleaned_sorted.csv", type=Path)
    args = parser.parse_args()

    if not args.input.exists():
        sys.exit(f"Input folder not found: {args.input}")

    frames = load_files(args.input)
    if not frames:
        sys.exit("No usable CSV files found.")

    final_df = clean(pd.concat(frames, ignore_index=True))
    print("Final shape:", final_df.shape)
    validate(final_df)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    final_df.to_csv(args.output, index=False)
    print(f"Saved: {args.output}")


if __name__ == "__main__":
    main()
