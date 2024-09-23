import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Column,
  Button,
} from "@react-email/components";
import * as React from "react";

interface Props {
  preview?: string;
}

/**
 * TopSection의 내용만 수정해주세요.
 */

const TopSection = () => {
  return (
    <Section style={topSectionStyle}>
      <Heading style={headerTextStyle}>Verify your email address</Heading>
      <Section>
        <Text style={mainTextStyle}>
          {`Thanks for starting the new AWS account creation process. We want to
          make sure it's really you. Please enter the following verification
          code when prompted. If you don&apos;t want to create an account, you
          can ignore this message. Thanks for starting the new AWS account
          creation process. We want to make sure it's really you. Please enter
          the following verification code when prompted. If you don&apos;t want
          to create an account, you can ignore this message. Thanks for starting
          the new AWS account creation process. We want to make sure it's really
          you. Please enter the following verification code when prompted. If
          you don&apos;t want to create an account, you can ignore this message.`}
        </Text>
        <Section style={centerTextStyle}>
          <Text style={verifyTextStyle}>Verification code</Text>

          <Text style={codeTextStyle}>{"596853"}</Text>
          <Text style={validityTextStyle}>
            (This code is valid for 10 minutes)
          </Text>
        </Section>
      </Section>
      <Section style={buttonSectionStyle}>
        <Button
          style={buttonStyle}
          href={"https://help.goorm.io/ko/goormide/gpu/introduction"}
        >
          Purchase credits now
        </Button>
      </Section>
    </Section>
  );
};

export default function Email({ preview = "Goorm" }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Logo />
          <Section style={coverSectionStyle}>
            <TopSection />
            <Hr />
            <BottomSection />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const Logo = () => {
  return (
    <Section style={logoStyle}>
      <Img src="https://img.stibee.com/23600_1653469989.png" width={630} />
    </Section>
  );
};

const SocialLink = ({
  href,
  src,
  title,
  alt,
  padding,
}: {
  href: string;
  src: string;
  title: string;
  alt: string;
  padding: string;
}) => (
  <Column style={linkWrapperStyle(padding)}>
    <Link
      href={href}
      style={linkStyle}
      target="_blank"
      title={title}
      rel="noopener noreferrer"
    >
      <Img src={src} height="30" width="30" alt={alt} />
    </Link>
  </Column>
);

const BottomSection = () => {
  return (
    <>
      <Section style={bottomSectionStyle}>
        <Section style={iconSectionStyle}>
          <SocialLink
            href="https://goorm.co/?utm_source=newsletter&utm_medium=email&utm_campaign=goorm&utm_content=welcome_mail&utm_term=footer"
            src="https://resource.stibee.com/editor/icon/sns/homepage2-snsC.png"
            title="homepage"
            alt="homepage"
            padding="0 10px 0 0"
          />
          <SocialLink
            href="https://blog.goorm.io/?utm_source=newsletter&utm_medium=email&utm_campaign=goormblog&utm_content=welcome_mail"
            src="https://resource.stibee.com/editor/icon/sns/blog-snsC.png"
            title="blog"
            alt="blog"
            padding="0 10px"
          />
          <SocialLink
            href="https://www.instagram.com/goorm.co/"
            src="https://resource.stibee.com/editor/icon/sns/instagram-snsC.png"
            title="instagram"
            alt="instagram"
            padding="0 10px"
          />
          <SocialLink
            href="https://www.facebook.com/goorm.official/"
            src="https://resource.stibee.com/editor/icon/sns/facebook-snsC.png"
            title="facebook"
            alt="facebook"
            padding="0 0 0 10px"
          />
        </Section>
        <Section>
          <Text style={footerText}>
            This email is for sending only and cannot be replyed to.
            <br />
            <br />
            ⓒ goorm Inc. All Rights Reserved.
            <br />
            A-#902, PDC, 242, Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do,
            Republic of Korea
          </Text>
        </Section>
      </Section>
    </>
  );
};

const mainStyle = {
  backgroundColor: "#fff",
  color: "#212121",
};

const logoStyle = {
  display: "flex",
  padding: "0",
};

const containerStyle = {
  padding: "20px 20px 40px 20px",
  margin: "0 auto",
  backgroundColor: "#e1e1e8",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const headerTextStyle = {
  ...text,
  fontSize: "27px",
  fontWeight: "bold",
  margin: "15px 0",
  textAlign: "center" as const,
};

const coverSectionStyle = { backgroundColor: "#fff" };

const topSectionStyle = { padding: "25px 35px" };

const bottomSectionStyle = { padding: "0px" };

const buttonSectionStyle = {
  padding: "25px 0 0 0",
  textAlign: "center" as const,
};

const footerText = {
  ...text,
  fontSize: "12px",
  margin: "0px",
  padding: "15px",
  textAlign: "center" as const,
  color: "#656774",
};

const verifyTextStyle = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeTextStyle = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityTextStyle = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const centerTextStyle = {
  textAlign: "center" as const,
};

const mainTextStyle = { ...text, marginBottom: "14px" };

const buttonStyle = {
  ...text,
  background: "#1d6ce0",
  backgroundColor: "#1d6ce0",
  borderRadius: "3px",
  textAlign: "center" as const,
  color: "#ffffff",
  textDecoration: "none",
  outline: "0px",
  padding: "17px 20px",
  margin: "0px",
};

const iconSectionStyle = {
  margin: "0 auto",
  padding: "30px 0 0 0",
  width: "100%",
  textAlign: "center" as const,
};

const linkWrapperStyle = (padding: string) => ({
  display: "inline-block",
  margin: padding,
});

const linkStyle = {
  textDecoration: "none",
  color: "rgb(80, 148, 250)",
  fontWeight: "bold",
};
