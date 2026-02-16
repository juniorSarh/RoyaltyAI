export const isTimeSensitive = (question: string): boolean => {
  const timeSensitivePatterns = [
    /latest|current|today|now|this year|recent|as of/i,
    /what is the date/i,
    /what time is it/i,
    /date today/i,
    /today's date/i,
    /current date/i,
    /what day is it/i
  ];
  
  const isTimeSensitive = timeSensitivePatterns.some(pattern => pattern.test(question));
  console.log(`🔍 Time sensitivity check for "${question}": ${isTimeSensitive}`);
  
  return isTimeSensitive;
};
