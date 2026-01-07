import { Request, Response } from "express";
import Lead, { ILead } from "../models/Lead";
import { validationResult } from "express-validator";

export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { name, email, phone, subject, message } = req.body;

    // Create new lead
    const lead: ILead = new Lead({
      name,
      email,
      phone,
      subject,
      message,
    });

    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: {
        id: lead._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        subject: lead.subject,
        message: lead.message,
        createdAt: lead.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error: any) {
    console.error("Error fetching lead:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

