import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/rmiY5YW4pi7L07SbLIkI/webhook-trigger/727777a8-64dc-449a-bd40-b182fce6d29e";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/privacy", (_req, res) => {
    res.redirect(301, "/privacy.html");
  });

  app.get("/terms", (_req, res) => {
    res.redirect(301, "/terms.html");
  });

  app.post("/api/submit-lead", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Forward to GHL webhook
      const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      
      if (!webhookResponse.ok) {
        throw new Error(`Webhook returned ${webhookResponse.status}`);
      }
      
      // Also store locally
      const submission = await storage.createContactSubmission(validatedData);
      
      console.log("Lead submitted to GHL webhook:", {
        id: submission.id,
        firstName: submission.firstName,
        lastName: submission.lastName,
        email: submission.email,
        phone: submission.phone,
        address: submission.address,
        source: submission.source,
        submittedAt: submission.submittedAt,
      });
      
      res.status(200).json({ 
        success: true, 
        message: "Lead submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      console.error("Lead submission error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Failed to submit lead" 
      });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      console.log("New contact form submission:", {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        address: submission.address,
        source: submission.source,
        submittedAt: submission.submittedAt,
      });
      
      res.status(200).json({ 
        success: true, 
        message: "Form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data" 
      });
    }
  });

  app.get("/api/contact/submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.status(200).json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error fetching submissions" 
      });
    }
  });

  return httpServer;
}
