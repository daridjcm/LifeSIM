import db from "../models/index.js";
const { Appointment } = db;

// FIXME fix here too
export const saveAppointment = async (req, res) => {
  try {
    const { user_id, doctor, date, time, specialist, area, status } = req.body;

    if (!user_id || !doctor || !date || !time || !specialist || !area || !status) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Convert "19/4/2025" → "2025-04-19"
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    const newAppointment = await Appointment.create({
      user_id,
      doctor,
      date: formattedDate,
      time,
      specialist,
      area,
      status,
    });

    console.log("Appointment scheduled:", newAppointment);
    res.status(201).json({
      message: "Appointment saved successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({
      error: "Error saving appointment",
      details: error.message,
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching appointments",
      details: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    appointment.status = status;
    await appointment.save();

    console.log("Appointment updated:", appointment);
    res.status(200).json({
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({
      error: "Error updating appointment",
      details: error.message,
    });
  }
};
