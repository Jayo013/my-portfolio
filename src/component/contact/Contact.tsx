import Section from "@/component/shared/Section";
import { Card, CardContent } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Github, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import { PROFILE } from "@/data/Portfolio";

const PHONE = "+94 750 509 482";

export default function Contact() {
  return (
    <Section id="contact" title={<span className="block text-center">Get in Touch</span>}>
      
      <p className="text-center text-sm sm:text-base text-muted-foreground -mt-3 mb-8">
        Have a project in mind or want to discuss potential opportunities? I'd love to hear from
        you. Fill out the form below, and I'll get back to you as soon as possible.
      </p>

      <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 items-start">
        {/* LEFT: Contact info + availability */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-muted-foreground hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{PHONE}</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{PROFILE.location}</p>
                </div>
              </li>
            </ul>

            {/* Socials (optional keep) */}
            <div className="mt-6 flex gap-3">
              <Button asChild variant="outline">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Availability card */}
          <Card className="shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <h4 className="font-semibold mb-3">Availability</h4>
              <p className="text-sm text-muted-foreground mb-4">
                I'm currently available for freelance work and open to discussing new opportunities.
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <span className="text-foreground">Monday – Friday</span>
                <span className="text-muted-foreground text-right">9:00 AM – 6:00 PM</span>

                <span className="text-foreground">Saturday</span>
                <span className="text-muted-foreground text-right">10:00 AM – 2:00 PM</span>

                <span className="text-foreground">Sunday</span>
                <span className="text-muted-foreground text-right">Closed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Form inside a soft card */}
        <Card className="shadow-md">
          <CardContent className="p-5 sm:p-6">
            <h3 className="text-xl font-semibold mb-5">Send a Message</h3>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: hook to Formspree/Getform/own API
              }}
            >
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <input
                  id="name"
                  className="h-10 rounded-md border bg-background px-3"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="h-10 rounded-md border bg-background px-3"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="msg" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="msg"
                  rows={6}
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="Tell me about your project or inquiry…"
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>

              <p className="text-xs text-muted-foreground">
                You can wire this form to Formspree, Getform, or your own API.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
