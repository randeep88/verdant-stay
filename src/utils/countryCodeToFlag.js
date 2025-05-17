export function countryCodeToFlag(countryCode) {
    // Check if the input is valid
    if (!countryCode || typeof countryCode !== 'string' || countryCode.length !== 2) {
      return '';
    }
    
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    
    return String.fromCodePoint(...codePoints);
  }