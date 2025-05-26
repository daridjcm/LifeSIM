import db from '../models/index.js';

const { Work } = db;

export const createWork = async (req, res) => {
  try {
    const user_id = req.userID;

    if (!user_id) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const existingWork = await Work.findOne({
      where: { user_id },
    });

    if (existingWork) {
      return res
        .status(409)
        .json({ message: `Work record already exists for the User ID: ${user_id}.` });
    }

    const newWork = await Work.create({
      user_id,
    });

    res
      .status(201)
      .json({
        message: 'Work record created successfully.',
        work: newWork,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error creating work record.', details: error.message });
  }
};

export const getCurrentWork = async (req, res) => {
  try {
    const work = await Work.findByPk(req.userID); // Fetch user data based on decoded user ID from token

    if (!work) {
      return res.status(404).json({ message: 'Work not found.' });
    }

    res.status(200).json({ work });
  } catch (error) {
    console.error('Error fetching work:', error);
    res.status(500).json({ message: 'Error fetching work.' });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const user_id = req.userID;

    if (!user_id) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const workRecord = await Work.findOne({
      where: { user_id },
    });

    if (!workRecord) {
      return res
        .status(404)
        .json({ message: `No work record found for User ID: ${user_id}.` });
    }

    await workRecord.destroy();

    res.status(200).json({ message: 'Work record deleted successfully.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error deleting work record.', details: error.message });
  }
}

export const updateWork = async (req, res) => {
  try {
    const user_id = req.userID;
    const {job, company, salary, start_date, end_date } = req.body;
    if (!user_id) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const workRecord = await Work.findOne({
      where: { user_id },
    });
    if (!workRecord) {
      return res
        .status(404)
        .json({ message: `No work record found for User ID: ${user_id}.` });
    }

    const updatedWork = await workRecord.update({
      job,
      company,
      salary,
      start_date,
      end_date,
    });

    res.status(200).json({
      message: 'Work record updated successfully.',
      work: updatedWork,
    });
  }
  catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating work record.', details: error.message });
  }
}