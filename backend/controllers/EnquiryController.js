import Enquiry from "../models/EnquriyModel.js";

export const createEnquiry = async (req, res) => {
  try {
    let event_date = new Date(req.body.event_date);
    let new_enquriy = await Enquiry.create({ ...req.body, event_date });
    console.log("new enquiry created");
    res.json({ message: "Enquiry Submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnquiries = async (req, res) => {
  let { filter, query } = req.query;
  try {
    let enquiries = [];
    switch (filter) {
      case "all":
        let db_query = {};
        if (query) db_query.name = { $regex: query, $options: "i" };
        enquiries = await Enquiry.find(db_query)
          .sort({ read: 1, createdAt: -1 })
          .select("-updatedAt -__v");
        return res.json({ enquiries });
      default:
        return res.status(400).json({ message: "Invalid filter option" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEnquiry = async (req, res) => {
  try {
    let { id } = req.params;
    let updated_enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { read: !req.body.read },
      { new: true },
    );
    return res.json({ updated_enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
