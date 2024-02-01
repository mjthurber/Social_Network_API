const { Thought, User } = require('../models'); // Adjust the path accordingly

const reactionData = [
  { reactionType: 'like', username: 'user1' },
  { reactionType: 'love', username: 'user2' },
  // Add more reactions as needed
];

const userData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    thoughts: [],
    friends: [],
  },
  // Add more user data as needed
];

const thoughtData = [
  {
    thoughtText: 'This is a sample thought.',
    username: 'user1',
    reactions: reactionData,
  },
  {
    thoughtText: 'Another thought here.',
    username: 'user2',
    reactions: [],
  },
  // Add more thought data as needed
];

async function seedData() {
  try {
    // Seed users
    const users = await User.insertMany(userData);

    // Seed thoughts
    const thoughts = await Thought.insertMany(thoughtData);

    // Associate thoughts with users
    users[0].thoughts.push(thoughts[0]);
    users[1].thoughts.push(thoughts[1]);

    // Save the updated users
    await Promise.all(users.map(user => user.save()));

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the mongoose connection
    mongoose.connection.close();
  }
}

// Call the seedData function to initiate the seeding process
seedData();
