import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import async from "async";

import { render } from "@react-email/render";
import EmailTemplateKo from "../../../../emails/origin_ko";
import EmailTemplateEn from "../../../../emails/origin_en";

const ses = new aws.SES({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
});
const transporter = nodemailer.createTransport({ SES: { ses, aws } });

export async function POST(req: Request) {
  const { language = "ko" } = await req.json();

  if (!language) {
    return new Response(JSON.stringify({ message: "Please select language" }), {
      status: 400,
    });
  }

  const subject = "💐 Don't miss out!";
  const preview = "preview";
  const csvFileName = language === "ko" ? "userList_ko.csv" : "userList_en.csv";

  try {
    const filePath = path.join(process.cwd(), "public", csvFileName);
    const lines = fs
      .readFileSync(filePath)
      .toString()
      .split("\n")
      .filter(Boolean);

    const Template = language === "ko" ? EmailTemplateKo : EmailTemplateEn;
    const emailHtml = await render(Template({ preview }));

    async.eachOfLimit(
      lines,
      20,
      async (to, index, callback) => {
        try {
          const info = await transporter.sendMail({
            from: process.env.ADMIN_USER,
            to,
            subject,
            html: emailHtml,
          });
          console.log("group", index, "info#", info);
        } catch (error) {
          console.error("Console.error" + " " + error);
          console.log("###################", to);
        } finally {
          callback();
        }
      },
      function () {
        console.log("sendMail done==================");
      }
    );

    return NextResponse.json(
      {
        message: "Request Email success",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Error: Could not send emails",
      },
      { status: 400 }
    );
  }
}
