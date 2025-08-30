import db from '../models/index.js';
import cron from 'node-cron';

// #region APPOINTMENTS
const { Appointment, Report } = db;

// Function to delete canceled appointments older than one hour
const deleteOldCanceledAppointments = async () => {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // Current time minus one hour
    await Appointment.destroy({
      where: {
        status: 'canceled',
        updatedAt: {
          [db.Sequelize.Op.lt]: oneMinuteAgo, // Assuming you have an updatedAt field
        },
      },
    });
  } catch (error) {
    console.error('Error deleting old canceled appointments:', error);
  }
};

// Schedule the job to run every hour
cron.schedule('* * * * *', deleteOldCanceledAppointments); // Runs at the start of every hour

export const saveAppointment = async (req, res) => {
  try {
    const { user_id, title, doctor, date, time, specialist, area, status } =
      req.body;

    if (
      !user_id ||
      !title ||
      !doctor ||
      !date ||
      !time ||
      !specialist ||
      !area ||
      !status
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Convert "19/4/2025" → "2025-04-19"
    const [day, month, year] = date.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Check for duplicate appointment
    const existingAppointment = await Appointment.findOne({
      where: {
        user_id,
        doctor,
        date: formattedDate,
        time,
        specialist,
        area,
        status,
      },
    });

    if (existingAppointment) {
      return res.status(409).json({ error: 'Duplicate appointment found.' });
    }

    const newAppointment = await Appointment.create({
      user_id,
      title,
      doctor,
      date: formattedDate,
      time,
      specialist,
      area,
      status,
    });

    console.log('Appointment scheduled:', newAppointment);
    res
      .status(200)
      .json({
        message: 'Appointment saved successfully.',
        appointment: newAppointment,
      });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res
      .status(500)
      .json({ error: 'Error saving appointment', details: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json({ appointments });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching appointments', details: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }

    appointment.status = status;
    await appointment.save();

    console.log('Appointment updated:', appointment);
    res
      .status(200)
      .json({ message: 'Appointment status updated.', appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res
      .status(500)
      .json({ error: 'Error updating appointment.', details: error.message });
  }
};

// #region REPORTS
export const reportAppointment = async (req, res) => {
  try {
    const {
      user_id,
      doctor,
      appointment_id,
      system,
      disease,
      severity,
      status,
      treatments,
      symptoms,
    } = req.body;

    // Validate required fields
    if (
      !user_id ||
      !doctor ||
      !appointment_id ||
      !system ||
      !disease ||
      !severity ||
      !status ||
      !treatments ||
      !symptoms // Corrected from system to symptoms
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check for duplicate report
    const existingReport = await Report.findOne({
      where: {
        user_id,
        appointment_id,
        doctor,
        disease,
        severity,
        status,
        system,
      },
    });

    if (existingReport) {
      return res.status(409).json({ error: 'Duplicate appointment found.' });
    }

    // Create the report
    const report = await db.Report.create({
      user_id,
      doctor,
      appointment_id,
      system,
      disease,
      severity,
      status,
      treatments,
      symptoms,
    });

    console.log('Appointment reported:', report);
    return res
      .status(200)
      .json({ message: 'Appointment reported successfully.', report });
  } catch (error) {
    console.error('Error reporting appointment:', error);
    return res
      .status(500)
      .json({ error: 'Error reporting appointment.', details: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await db.Report.findAll();

    console.log('Reports retrieved:', reports);
    res
      .status(200)
      .json({ message: 'Reports retrieved successfully.', reports });
  } catch (error) {
    console.error('Error retrieving reports:', error);
    res
      .status(500)
      .json({ error: 'Error retrieving reports.', details: error.message });
  }
};
