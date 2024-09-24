"use client";
import { Button } from "@/components/Button";

import { toast } from "react-toastify";

import { useState } from "react";

export default function Home() {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent, language: string) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
        }),
        mode: "no-cors",
      });

      toast.success(
        <span>
          이메일을 전송 중입니다.
          <br />
          로그파일을 확인해주세요
        </span>
      );
    } catch (error) {
      console.log(error);
      toast("이메일 전송에 실패하였습니다.", { type: "error" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
          Rapidly send email.
        </h1>
        <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto">
          A collection of high-quality, <br />
          unstyled components for creating beautiful emails
          <br />
          using{" "}
          <code className="font-mono font-medium text-sky-500">
            React and TypeScript.
          </code>
        </p>
        <div className="flex justify-center gap-4 mt-10 flex-col">
          <Button
            variant="default"
            size="lg"
            disabled={isSending}
            onClick={(e) => handleSubmit(e, "ko")}
          >
            Send email for Korean
          </Button>
          <Button
            variant="default"
            size="lg"
            disabled={isSending}
            onClick={(e) => handleSubmit(e, "en")}
          >
            Send email for Foreigner
          </Button>
        </div>
      </div>
    </>
  );
}
