import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import async from "async";

import { logToFile } from "@/utils/logger";
import { render } from "@react-email/render";
/**
 * 해당 부분만 변경해주세요.
 */
import EmailTemplateKo from "../../../../emails/2024/20240923_credit/20240923_credit_ko";
import EmailTemplateEn from "../../../../emails/2024/20240923_credit/20240923_credit_en";
/**
 * 해당 부분만 변경해주세요.
 */

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

  /**
   * 해당 부분만 변경해주세요.
   */
  const templateTitle =
    language === "ko"
      ? "[구름IDE] 멤버십 설문조사에 참여해 주셔서 감사합니다!"
      : "[goormIDE] Thank you for participating in our membership survey!";
  const templatePreview =
    language === "ko"
      ? "설문조사에 응해주신 분들께 리워드가 지급되었습니다."
      : "Rewards were given out to the selected customers.";
  const csvFileName = language === "ko" ? "userList_ko.csv" : "userList_en.csv";
  /**
   * 해당 부분만 변경해주세요.
   */

  try {
    const filePath = path.join(process.cwd(), "public", csvFileName);
    const lines = fs
      .readFileSync(filePath)
      .toString()
      .split("\n")
      .filter(Boolean);

    const Template = language === "ko" ? EmailTemplateKo : EmailTemplateEn;
    const emailHtml = await render(Template({ preview: templatePreview }));

    async.eachOfLimit(
      lines,
      20,
      async (to, index, callback) => {
        try {
          const info = await transporter.sendMail({
            from: process.env.ADMIN_USER,
            to,
            subject: templateTitle,
            html: emailHtml,
          });
          console.log("group", index, "info#", info);
          logToFile(to, "success");
        } catch (error) {
          console.error("Console.error" + " " + error);
          console.log("###################", to);
          logToFile(to, "fail");
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
