let details = [];

export const savePublicServices = async (req, res) => {
  try {
    const { publicServices } = req.body;

    details = publicServices.map((service) => ({
      service_name: service.service_name,
      payment_date: service.payment_date,
      total_cost: parseFloat(service.total_cost),
      paid: service.paid,
    }));

    res.status(200).json({ message: 'Public services saved successfully.', publicServices: details });
  } catch (error) {
    res.status(500).json({ error: 'Error saving public services.', details: error.message });
  }
};

export const getPublicServices = async (req, res) => {
  try {
    res.status(200).json({ publicServices: details });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching public services.', details: error.message });
  }
};