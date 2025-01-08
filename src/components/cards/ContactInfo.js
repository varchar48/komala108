import React from "react";
import { MailboxIcon } from "@/components/icons/icons";

const ContactInfo = ({ title, description, email }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
    <div className="flex items-center gap-2">
      <MailboxIcon className="h-5 w-5 text-gray-500" />
      <a className="text-gray-900 font-medium hover:underline" href={`mailto:${email}`}>
        {email}
      </a>
    </div>
  </div>
);

export default ContactInfo;
