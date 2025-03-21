let medicalAppointments = [];

export const saveAppointment = async (req, res) => {
  try {
    const { userId, doctor, date, time, specialist, area, status } = req.body;

    if (!userId || !doctor || !date || !time || !specialist || !area || !status) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save appointment in memory
    const newAppointment = {
      userId,
      doctor,
      date,
      time,
      specialist,
      area,
      status,
    };

    medicalAppointments.push(newAppointment);

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
    res.status(200).json({ appointments: medicalAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      error: "Error fetching appointments",
      details: error.message,
    });
  }
};