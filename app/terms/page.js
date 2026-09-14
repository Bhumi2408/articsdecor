// app/terms/page.jsx
import Link from "next/link";
import LegalPage, { P, UL, LI, Note } from "@/components/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Terms & Conditions - Artics Decorr",
  description:
    "Read the Terms & Conditions for using the Artics Decorr website and purchasing outdoor furniture and decor products.",
};

const SECTIONS = [
  {
    id: "who-we-are",
    heading: "Who We Are",
    body: (
      <>
        <P>
          This website is owned and operated by {COMPANY.legalName}, trading
          under the name {COMPANY.tradingName}. Artics Decorr specialises in
          outdoor furniture and decor products designed for residential,
          commercial, hospitality and outdoor environments.
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Business name:
            </strong>{" "}
            {COMPANY.legalName}
          </LI>



          <LI>
            <strong className="font-medium text-[#132c47]">
              Address:
            </strong>{" "}
            {COMPANY.address}
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Email:
            </strong>{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-[#770800] hover:underline"
            >
              {COMPANY.email}
            </a>
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Telephone:
            </strong>{" "}
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="text-[#770800] hover:underline"
            >
              {COMPANY.phone}
            </a>
          </LI>
        </UL>
      </>
    ),
  },

  {
    id: "acceptance",
    heading: "Accepting These Terms",
    body: (
      <>
        <P>
          By accessing or using this website, creating an account or placing an
          order, you agree to these Terms &amp; Conditions, our{" "}
          <Link
            href="/privacy"
            className="text-[#770800] hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          and our{" "}
          <Link
            href="/refund-returns"
            className="text-[#770800] hover:underline"
          >
            Refund &amp; Return Policy
          </Link>
          .
        </P>

        <P>
          If you do not agree with these terms, please do not use this website
          or place an order through it.
        </P>

        <P>
          You must be legally capable of entering into a contract to purchase
          products through this website. If you are under the applicable age of
          majority, you should use the website with the involvement of a parent
          or legal guardian.
        </P>
      </>
    ),
  },

  {
    id: "accounts",
    heading: "Your Account",
    body: (
      <>
        <P>
          Some features of the website may require you to create an account
          using information such as your name, email address and password.
        </P>

        <P>
          You are responsible for keeping your login credentials confidential
          and for activities carried out through your account. Please contact
          us promptly if you believe that your account has been accessed
          without your permission.
        </P>

        <P>
          We reserve the right to suspend or close an account where we
          reasonably believe that it is being used fraudulently, unlawfully or
          in violation of these terms.
        </P>
      </>
    ),
  },

  {
    id: "products",
    heading: "Products, Images & Descriptions",
    body: (
      <>
        <P>
          We make reasonable efforts to ensure that product names,
          specifications, dimensions, materials, colours, images and
          descriptions displayed on the website are accurate.
        </P>

        <P>
          Product images are provided for representation purposes. Actual
          colour, texture, finish and appearance may vary depending on
          lighting, screen settings, photography and the natural
          characteristics of certain materials.
        </P>

        <P>
          Outdoor furniture may contain handcrafted or naturally varying
          elements. Minor variations in texture, grain, weave, colour or finish
          do not necessarily indicate a manufacturing defect.
        </P>

        <Note>
          Please review product specifications, dimensions, materials, finish
          and other details carefully before placing an order. If you require
          clarification about a product, contact us before purchasing.
        </Note>
      </>
    ),
  },

  {
    id: "pricing",
    heading: "Prices & Taxes",
    body: (
      <>
        <P>
          Product prices are displayed in {COMPANY.currency}, unless otherwise
          stated. Applicable taxes, delivery charges or other additional
          charges will be communicated or displayed as applicable before
          completion of your purchase.
        </P>

        <P>
          Prices may change from time to time. A price change after you have
          successfully placed and paid for an order will not affect the agreed
          price for that order, except where an order is cancelled due to an
          obvious pricing or listing error.
        </P>

        <Note>
          Despite our efforts to maintain accurate pricing, an item may
          occasionally be displayed with an incorrect price or product
          information. If we identify a significant error before dispatch, we
          may contact you to confirm whether you wish to proceed at the correct
          price or cancel the order for an applicable refund.
        </Note>
      </>
    ),
  },

  {
    id: "orders",
    heading: "Orders & Contract Formation",
    body: (
      <>
        <P>
          When you place an order through our website, you are submitting a
          request to purchase the selected products. An order confirmation
          acknowledges that we have received your request and does not
          necessarily mean that the order has been finally accepted.
        </P>

        <P>
          We may decline, cancel or modify an order where reasonably necessary,
          including in situations such as:
        </P>

        <UL>
          <LI>The product is unavailable or out of stock.</LI>
          <LI>There is an obvious pricing or product-description error.</LI>
          <LI>
            Payment cannot be verified or appears to be fraudulent or
            unauthorised.
          </LI>
          <LI>
            We are unable to deliver the product to the provided address.
          </LI>
          <LI>
            The order contains information that is incomplete or incorrect.
          </LI>
        </UL>

        <P>
          If we cancel an order after payment has been received, we will
          process the applicable refund according to our Refund &amp; Return
          Policy and the circumstances of the cancellation.
        </P>
      </>
    ),
  },

  {
    id: "payment",
    heading: "Payment",
    body: (
      <>
        <P>
          Payments for orders are processed through the payment method or
          payment service provider made available during checkout.
        </P>

        <P>
          Your order may only be processed after the required payment has been
          successfully authorised or received. We may delay dispatch until
          payment has been confirmed.
        </P>

        <P>
          Payment information may be handled directly by third-party payment
          providers according to their applicable terms and privacy policies.
        </P>
      </>
    ),
  },

  {
    id: "delivery",
    heading: "Delivery",
    body: (
      <>
        <P>
          Products are dispatched according to the estimated processing and
          dispatch timeline communicated on the website or at the time of
          purchase. Custom, made-to-order or specially configured furniture
          may require additional time.
        </P>

        <P>
          Delivery timeframes are estimates and may be affected by product
          availability, manufacturing schedules, courier operations, weather,
          public holidays or circumstances outside our reasonable control.
        </P>

        <P>
          We will provide available tracking or delivery information where
          applicable. Please ensure that the delivery address and contact
          details provided during checkout are accurate and that someone is
          reasonably available to receive the order.
        </P>

        <P>
          For large furniture deliveries, you are responsible for ensuring
          suitable access to the delivery location, including adequate doorway,
          staircase, lift and passage clearance where applicable.
        </P>
      </>
    ),
  },

  {
    id: "inspection",
    heading: "Delivery Inspection",
    body: (
      <>
        <P>
          We recommend inspecting your products as soon as reasonably possible
          after delivery.
        </P>

        <P>
          If your furniture arrives visibly damaged, incomplete or different
          from what you ordered, please contact us promptly with your order
          details and clear photographs or videos showing the issue.
        </P>

        <P>
          Reporting an issue promptly helps us investigate the matter with the
          delivery partner or relevant internal team and provide an appropriate
          resolution.
        </P>
      </>
    ),
  },

  {
    id: "returns",
    heading: "Returns, Replacements & Cancellations",
    body: (
      <P>
        Our return, replacement, refund and cancellation procedures are
        described in detail in our{" "}
        <Link
          href="/refund-returns"
          className="text-[#770800] hover:underline"
        >
          Refund &amp; Return Policy
        </Link>
        .
        <br />
        <br />
        Certain products may be subject to specific return conditions,
        particularly customised, made-to-order, assembled or specially
        configured products. Please review the applicable policy before
        placing your order.
      </P>
    ),
  },

  {
    id: "care",
    heading: "Product Care & Usage",
    body: (
      <>
        <P>
          Outdoor furniture is designed for outdoor environments, but proper
          care is important to maintain its appearance, performance and
          lifespan.
        </P>

        <P>
          Follow the care and maintenance instructions provided with your
          product. Where applicable, protect cushions, upholstery, fabrics,
          finishes and other components from prolonged exposure to extreme
          weather conditions when recommended.
        </P>

        <P>
          Damage caused by misuse, improper installation, unauthorised
          modification, neglect, accidents, improper cleaning or failure to
          follow product-care instructions may not be covered by an applicable
          warranty or replacement policy.
        </P>
      </>
    ),
  },

  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: (
      <P>
        All content available on this website, including product photographs,
        images, graphics, text, logos, branding, designs, layouts, videos and
        other materials, belongs to Artics Decorr or its respective licensors
        and may be protected by applicable intellectual-property laws.
        <br />
        <br />
        You may access and use the website for personal or legitimate
        purchasing purposes. You may not reproduce, copy, modify, distribute,
        republish, sell or commercially exploit our content without our prior
        written permission.
      </P>
    ),
  },

  {
    id: "acceptable-use",
    heading: "Acceptable Use",
    body: (
      <>
        <P>You agree not to:</P>

        <UL>
          <LI>
            Use the website for unlawful, fraudulent or unauthorised purposes.
          </LI>

          <LI>
            Attempt to gain unauthorised access to the website, accounts,
            servers or systems.
          </LI>

          <LI>
            Introduce malicious code, viruses or other harmful technology.
          </LI>

          <LI>
            Scrape, copy or systematically collect website data without our
            permission.
          </LI>

          <LI>
            Submit false, misleading, defamatory or unlawful reviews,
            communications or other content.
          </LI>

          <LI>
            Interfere with the normal operation, security or availability of
            the website.
          </LI>
        </UL>
      </>
    ),
  },

  {
    id: "availability",
    heading: "Website Availability",
    body: (
      <P>
        We aim to keep our website and services available and accurate, but we
        do not guarantee that the website will always be uninterrupted,
        error-free or available at all times.
        <br />
        <br />
        Website features, product availability, pricing and content may be
        updated, suspended or changed from time to time without prior notice
        where reasonably necessary.
      </P>
    ),
  },

  {
    id: "liability",
    heading: "Limitation of Liability",
    body: (
      <>
        <P>
          We take reasonable care in operating our website and providing our
          products. However, to the fullest extent permitted by applicable law,
          Artics Decorr will not be responsible for indirect or consequential
          losses arising from the use of the website or delays caused by
          circumstances outside our reasonable control.
        </P>

        <P>
          Nothing in these Terms &amp; Conditions is intended to exclude or
          limit any liability or consumer right that cannot legally be excluded
          or limited under applicable law.
        </P>

        <P>
          We are not responsible for delays or failures resulting from events
          beyond our reasonable control, including natural disasters, severe
          weather, strikes, transportation disruptions, network failures,
          power outages, government restrictions or other similar events.
        </P>
      </>
    ),
  },

  {
    id: "privacy",
    heading: "Privacy",
    body: (
      <P>
        Information about how we collect, use, store and protect personal
        information is provided in our{" "}
        <Link
          href="/privacy"
          className="text-[#770800] hover:underline"
        >
          Privacy Policy
        </Link>
        .
        <br />
        <br />
        By using the website, you acknowledge that personal information may be
        processed as described in that policy.
      </P>
    ),
  },

  {
    id: "governing-law",
    heading: "Governing Law & Disputes",
    body: (
      <>
        <P>
          These Terms &amp; Conditions are intended to be interpreted in
          accordance with the applicable laws of India.
        </P>

        <P>
          If you have a concern, complaint or dispute relating to an order or
          our services, we encourage you to contact us first so that we can
          attempt to resolve the matter directly and efficiently.
        </P>

        <P>
          Nothing in these terms prevents a consumer from exercising any
          rights or remedies available under applicable consumer-protection
          laws.
        </P>
      </>
    ),
  },

  {
    id: "changes",
    heading: "Changes to These Terms",
    body: (
      <P>
        We may update these Terms &amp; Conditions from time to time to reflect
        changes in our products, services, website or applicable legal
        requirements.
        <br />
        <br />
        The updated version will be published on this page. The version
        applicable to an order will generally be the version in effect at the
        time the order is placed, subject to applicable law.
      </P>
    ),
  },

  {
    id: "contact",
    heading: "Contact Us",
    body: (
      <>
        <P>
          If you have any questions regarding these Terms &amp; Conditions,
          products, orders, deliveries or returns, please contact Artics
          Decorr.
        </P>

        <UL>
          <LI>
            <strong className="font-medium text-[#132c47]">
              Company:
            </strong>{" "}
            {COMPANY.legalName}
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Email:
            </strong>{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-[#770800] hover:underline"
            >
              {COMPANY.email}
            </a>
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Phone:
            </strong>{" "}
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="text-[#770800] hover:underline"
            >
              {COMPANY.phone}
            </a>
          </LI>

          <LI>
            <strong className="font-medium text-[#132c47]">
              Address:
            </strong>{" "}
            {COMPANY.address}
          </LI>
        </UL>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      breadcrumb="Terms & Conditions"
      subtitle="The terms that apply when you use the Artics Decorr website or purchase our outdoor furniture and decor products."
      sections={SECTIONS}
    />
  );
}