/**
 * Utility functions for high-quality avatar generation
 */

// Collection of high-quality portrait APIs
const PORTRAIT_APIS = {
  // RandomUser API provides consistent, high-quality portraits with gender selection
  randomuser: {
    getUrl: (gender, id) => {
      // Convert ID to a consistent number between 1-99
      const avatarNumber = Math.abs(hashCode(id) % 99) + 1;
      return `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${avatarNumber}.jpg`;
    }
  }
};

// Simple string hash function to generate consistent numbers from IDs
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Get high-quality realistic human portrait URL based on user object
 * @param {Object|string} user - User object with gender field or user ID string
 * @returns {string} - URL to the high-quality portrait image
 */
export const getAvatarUrl = (user) => {
  // If user is an ID string (for backward compatibility)
  if (typeof user === 'string') {
    const id = user;
    // For backward compatibility, determine gender from ID
    const gender = Math.abs(hashCode(id) % 2) === 0 ? 'male' : 'female';
    return PORTRAIT_APIS.randomuser.getUrl(gender, id);
  }
  
  // If user is an object with gender field
  if (user && user.gender && user._id) {
    return PORTRAIT_APIS.randomuser.getUrl(user.gender, user._id);
  }
  
  // Fallback for when user object doesn't have gender or _id
  return 'https://randomuser.me/api/portraits/lego/1.jpg';
};