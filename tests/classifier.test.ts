import { describe, it, expect } from 'vitest';
import { classifier } from '../src/lib/classifier';

describe('RuleBasedP1Classifier (Prototype 1 Heuristic Engine)', () => {
  it('Case 1: Correctly classifies English Pro-BJP discourse', () => {
    const text = 'Narendra Modi has led remarkable progress and digital growth with strong leadership.';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('bjp');
    expect(result.effectiveSentiment).toBe('positive');
    expect(result.ideologyLabel).toBe('pro_bjp');
    expect(result.confidence).toBeGreaterThan(0.7);
  });

  it('Case 2: Correctly classifies English Anti-Congress discourse', () => {
    const text = 'Decades of Congress corruption and scam ruined public institutions.';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('congress');
    expect(result.effectiveSentiment).toBe('negative');
    expect(result.ideologyLabel).toBe('anti_congress');
    expect(result.confidence).toBeGreaterThan(0.7);
  });

  it('Case 3: Correctly classifies Hinglish Pro-BJP review with positive words (achha, vikas)', () => {
    const text = 'Modi ji ka kaam sach mein achha hai aur vikas ground level par dikh raha hai.';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('bjp');
    expect(result.effectiveSentiment).toBe('positive');
    expect(result.ideologyLabel).toBe('pro_bjp');
    expect(result.explanation.sentimentWordsMatched).toContain('achha');
  });

  it('Case 4: Correctly classifies Hinglish Anti-BJP text with negative words (barbaad, bekar)', () => {
    const text = 'BJP sarkar ne aam aadmi ko mehangai se barbaad aur bekar kar diya.';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('bjp');
    expect(result.effectiveSentiment).toBe('negative');
    expect(result.ideologyLabel).toBe('anti_bjp');
    expect(result.explanation.sentimentWordsMatched.some((w) => ['barbaad', 'bekar', 'mehangai'].includes(w))).toBe(true);
  });

  it('Case 5: Detects Hinglish sarcasm and flips polarity (Wah kya vikas hai)', () => {
    const text = 'Wah kya vikas hai Modi ji! Bijli 8 ghante gayab rehti hai aur sadak bekaar hai.';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('bjp');
    expect(result.isSarcastic).toBe(true);
    expect(result.effectiveSentiment).toBe('negative');
    expect(result.ideologyLabel).toBe('anti_bjp');
    expect(result.explanation.sarcasmApplied).toBe(true);
  });

  it('Case 6: Correctly classifies Hindi Devanagari Pro-AAP statement', () => {
    const text = 'केजरीवाल ने शिक्षा और अस्पतालों में बहुत अच्छा और सराहनीय काम किया है।';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('aap');
    expect(result.effectiveSentiment).toBe('positive');
    expect(result.ideologyLabel).toBe('pro_aap');
  });

  it('Case 7: Correctly classifies Hindi Devanagari Anti-TMC statement', () => {
    const text = 'टीएमसी और ममता बनर्जी के शासन में भारी भ्रष्टाचार और नुकसान हुआ।';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('tmc');
    expect(result.effectiveSentiment).toBe('negative');
    expect(result.ideologyLabel).toBe('anti_tmc');
  });

  it('Case 8: Correctly handles non-political neutral factual statements', () => {
    const text = 'The Election Commission announced polling will take place between 7 AM and 6 PM.';
    const result = classifier.classify(text);

    expect(result.detectedParty).toBe('unknown');
    expect(result.ideologyLabel).toBe('neutral');
  });

  it('Case 9: Correctly respects manual sarcasm override flag', () => {
    const text = 'Modi ji ne bahut achha kaam kiya.';
    // Without sarcasm override -> pro_bjp
    const normalResult = classifier.classify(text, { sarcasmOverride: false });
    expect(normalResult.ideologyLabel).toBe('pro_bjp');

    // With sarcasm override -> flips to anti_bjp
    const sarcasticResult = classifier.classify(text, { sarcasmOverride: true });
    expect(sarcasticResult.isSarcastic).toBe(true);
    expect(sarcasticResult.effectiveSentiment).toBe('negative');
    expect(sarcasticResult.ideologyLabel).toBe('anti_bjp');
    expect(sarcasticResult.explanation.sarcasmApplied).toBe(true);
  });

  it('Case 10: Gracefully handles empty or whitespace input', () => {
    const result = classifier.classify('   ');
    expect(result.ideologyLabel).toBe('neutral');
    expect(result.detectedParty).toBe('neutral');
  });
});
