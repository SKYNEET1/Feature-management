const { pool } = require("../config/database");

const createFeatures = async (feature_name, description, parent_id = null) => {

    try {

        const featureNameLower = feature_name.toLowerCase();
        const descriptionLower = description ? description.toLowerCase() : null;
        const existing = await pool.query(`
            SELECT * FROM features where LOWER(feature_name) = $1 OR LOWER(description) = $2
            `, [featureNameLower, descriptionLower])

        if (existing.rows.length > 0) {
            throw new Error('feature with same name and desc already exists')
        }

        if (parent_id !== null) {

            const parentCheck = await pool.query(
                `SELECT feature_id FROM features WHERE feature_id = $1 AND is_removed = false`,
                [parent_id]
            );

            if (parentCheck.rows.length === 0) {
                throw new Error(`Parent feature with id ${parent_id} does not exist or deleted`);
            }

        }

        const result = await pool.query(
            `
            INSERT INTO features(feature_name,description,parent_id)
            VALUES ($1,$2,$3) RETURNING *
            `, [feature_name, description, parent_id]
        )

        return result.rows[0];

    } catch (error) {

        throw new Error(` createFeatures Error: ${error.message}`, error);

    }

}

const featureRemove = async (feature_id) => {

    try {

        const feature = await pool.query(`
            SELECT * FROM features
            WHERE feature_id = $1   
            `, [feature_id]);

        if (feature.rows.length === 0) {
            throw new Error('Please provide a valid feature_id');
        }

        const remove = await pool.query(`
        UPDATE features
        SET is_removed = true
        WHERE feature_id = $1
        RETURNING *
    `, [feature_id]);

        return remove.rows[0];

    } catch (error) {

        throw new Error(` featureRemove Error: ${error.message}`, error)

    }

}

const getFeatures = async () => {

    try {

        const Allfeatures = await pool.query(`
            SELECT * FROM features 
            WHERE is_removed = $1
            `, [false])

        if (Allfeatures.length === 0) {
            return []
        }

        return Allfeatures.rows;

    } catch (error) {

        throw new Error(`getFeatures Error: ${error.message}`);

    }

}

const asignFeatures = async (consumer_id, feature_id) => {

    try {

        // 1. Validate consumer exists
        const isConsumer = await pool.query(
            `SELECT * FROM consumer WHERE consumer_id = $1`, 
            [consumer_id]
        );

        if (isConsumer.rows.length === 0) {
            throw new Error("Consumer does not exist");
        }

        const isFeature = await pool.query(
            `
            SELECT * FROM features
            WHERE feature_id = $1
            `, [feature_id])

        if (isFeature.rows.length === 0) {
            throw new Error(`Please provide a valid feature`)
        }

        const assigned = [];

        const mainAsign = await pool.query(
            `
            INSERT INTO user_features (consumer_id, feature_id)
            VALUES ($1, $2)
            ON CONFLICT (consumer_id, feature_id) DO NOTHING
            RETURNING *;
            `, [consumer_id, feature_id]
        )
        if (mainAsign.rows.length > 0) {
            assigned.push(mainAsign.rows[0]);
        } else {
            throw new Error('Could not able to assign the feature to the user')
        }

        const children = await pool.query(
            `
            SELECT feature_id FROM features WHERE parent_id = $1 AND is_removed = false;
            `, [feature_id]
        )

        for (const child of children.rows) {
            const res = await pool.query(
                `INSERT INTO user_features (consumer_id, feature_id)
                 VALUES ($1, $2)
                 ON CONFLICT (consumer_id, feature_id) DO NOTHING
                 RETURNING *;`,
                [consumer_id, child.feature_id]
            );
            if (res.rows.length > 0) assigned.push(res.rows[0]);
        };

        return assigned;

    } catch (error) {

        throw new Error(`asignFeatures Error: ${error.message}`);

    }

}

module.exports = { createFeatures, featureRemove, getFeatures, asignFeatures }
