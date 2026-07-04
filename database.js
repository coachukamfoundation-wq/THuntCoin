const users = new Map();

// ===========================
// Create or Get User
// ===========================

function getUser(userId) {

    if (!users.has(userId)) {

        users.set(userId, {

            id: userId,
            balance: 0,
            adsWatched: 0,
            huntGames: 0,
            totalWithdrawn: 0,
            referrals: 0

        });

    }

    return users.get(userId);

}

// ===========================
// Update Balance
// ===========================

function addBalance(userId, amount) {

    const user = getUser(userId);

    user.balance += amount;

    return user;

}

// ===========================
// Deduct Balance
// ===========================

function removeBalance(userId, amount) {

    const user = getUser(userId);

    if (user.balance >= amount) {

        user.balance -= amount;

    }

    return user;

}

module.exports = {

    getUser,
    addBalance,
    removeBalance

};
