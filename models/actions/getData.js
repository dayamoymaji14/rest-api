const mongodb = require('../connections/mongodb');

const getData = async (data) => {
    try {
        const db = await mongodb.getDb();
        const collectionName = 'records';
        const command = [
            {
                $project: {
                    _id: 0,
                    key: 1,
                    createdAt: 1,
                    totalCount: { $sum: '$counts' }
                }
            },
            {
                $match: {
                    createdAt: {
                        $gte: new Date(data.startDate),
                        $lte: new Date(data.endDate),
                    },
                    totalCount: {
                        $gte: data.minCount,
                        $lte: data.maxCount
                    }
                }
            }
        ];
        const records = await db.collection(collectionName).aggregate(command).toArray();
        return records;
    } catch (error) {
        throw error;
    }
};

module.exports = getData;