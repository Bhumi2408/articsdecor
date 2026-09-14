// app/refund-returns/page.jsx

import Link from "next/link";
import LegalPage, { P, UL, LI, Note } from "@/components/LegalPage";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Return & Refund Policy - Artics Decorr",
  description:
    "Read the Artics Decorr return, replacement, cancellation and refund policy for outdoor furniture and decor products.",
};

const SECTIONS = [
  {
    id: "overview",
    heading: "Overview",
    body: (
      <>
        <P>
          At Artics Decorr, we take pride in delivering thoughtfully designed
          outdoor furniture and decor made for comfort, durability and everyday
          outdoor living. Every order is carefully checked before dispatch.
        </P>

        <P>
          If your order arrives damaged, defective, incorrect, or you have a
          genuine issue with your purchase, please contact us and our team will
          help you with the appropriate resolution.
        </P>

        <Note>
          This policy applies to products purchased directly from Artics Decorr
          through our website or authorised sales channels. Custom-made and
          made-to-order products may be subject to different return conditions.
        </Note>
      </>
    ),
  },

  {
    id: "return-window",
    heading: "Return & Replacement Window",
    body: (
      <>
        <P>
          Standard products may be eligible for return or replacement depending
          on the condition of the product and the reason for the return. Please
          contact us as soon as possible after delivery if you have any issue
          with your order.
        </P>

        <P>
          For products that arrive damaged, defective or incorrect, please
          notify us within the applicable period mentioned in your order
          confirmation or delivery documentation, along with clear photographs
          or videos of the product and packaging.
        </P>

        <P>
          Products must generally be returned in unused condition, with their
          original packaging and accessories wherever applicable.
        </P>
      </>
    ),
  },

  {
    id: "eligible",
    heading: "When a Return or Replacement May Be Accepted",
    body: (
      <>
        <P>
          A return or replacement request may be considered in the following
          situations:
        </P>

        <UL>
          <LI>The product received is damaged during transit.</LI>
          <LI>The product has a genuine manufacturing defect.</LI>
          <LI>The product received is different from what was ordered.</LI>
          <LI>
            The product is missing an essential part or accessory supplied with
            the order.
          </LI>
          <LI>
            The product has a significant issue that prevents it from being
            used for its intended purpose.
          </LI>
        </UL>

        <P>
          Our team may request photographs, videos, packaging details, order
          information or other information required to assess the issue.
        </P>
      </>
    ),
  },

  {
    id: "condition",
    heading: "Condition of Returned Products",
    body: (
      <>
        <P>
          Where a return is approved, the product should be returned in
          reasonable condition along with its original packaging, accessories,
          cushions, covers and other components supplied with the order, where
          applicable.
        </P>

        <UL>
          <LI>The product should not have been intentionally damaged.</LI>
          <LI>
            The product should not have been modified or altered after
            delivery.
          </LI>
          <LI>
            All accessories and components supplied with the product should be
            included.
          </LI>
          <LI>
            Original packaging should be retained wherever possible, especially
            in the case of transit-related claims.
          </LI>
        </UL>

        <P>
          Products showing damage caused after delivery due to misuse,
          negligence, improper installation, accidents, exposure to unsuitable
          conditions, or unauthorised modifications may not qualify for a
          return or replacement.
        </P>
      </>
    ),
  },

  {
    id: "non-returnable",
    heading: "Products That May Not Be Returnable",
    body: (
      <>
        <P>
          Certain products may not be eligible for return or cancellation once
          production or customisation has started.
        </P>

        <UL>
          <LI>Custom-made or specially commissioned furniture.</LI>
          <LI>Made-to-order products.</LI>
          <LI>Products customised according to specific customer requirements.</LI>
          <LI>
            Products that have been modified, assembled or altered at the
            customer's request.
          </LI>
          <LI>
            Products that have been used, damaged or improperly maintained
            after delivery.
          </LI>
        </UL>

        <Note>
          If a custom or made-to-order product arrives damaged or has a genuine
          manufacturing defect, please contact us. Such issues will be
          reviewed separately.
        </Note>
      </>
    ),
  },

  {
    id: "how-to-return",
    heading: "How to Request a Return",
    body: (
      <>
        <P>
          To start a return, replacement or damage claim, please contact our
          customer support team with the following information:
        </P>

        <UL>
          <LI>Your order number.</LI>
          <LI>Name and contact details used for the order.</LI>
          <LI>Name of the product you are contacting us about.</LI>
          <LI>Reason for the return or replacement request.</LI>
          <LI>Clear photographs or videos showing the issue.</LI>
        </UL>

        <P>
          Our team will review the request and guide you through the next
          steps. Please do not send a product back without receiving return
          instructions from our team.
        </P>
      </>
    ),
  },

  {
    id: "damaged",
    heading: "Products Damaged in Transit",
    body: (
      <>
        <P>
          We carefully pack our products before dispatch. However, furniture
          and decor items can sometimes be affected during transportation.
        </P>

        <P>
          If the outer packaging appears torn, crushed, opened or otherwise
          damaged at the time of delivery, please photograph the packaging
          before opening it wherever possible.
        </P>

        <P>
          After opening the package, inspect the product and inform us promptly
          if you notice any damage. Please provide photographs or videos of the
          packaging as well as the affected product so that we can assess the
          issue and coordinate the appropriate resolution.
        </P>

        <Note>
          Keeping the original packaging until you are satisfied with the
          condition of your order can help us process transit-related claims
          more efficiently.
        </Note>
      </>
    ),
  },

  {
    id: "wrong-product",
    heading: "Wrong or Missing Product",
    body: (
      <>
        <P>
          If you receive a product that differs from your order, or if an item
          or essential component is missing, please contact us with your order
          number and photographs of the received shipment.
        </P>

        <P>
          Once verified, Artics Decorr will work with you to arrange the
          appropriate replacement or resolution.
        </P>
      </>
    ),
  },

  {
    id: "refunds",
    heading: "Refunds",
    body: (
      <>
        <P>
          Once a return is approved and the returned product has been received
          and inspected, we will process the applicable refund according to the
          outcome of the inspection.
        </P>

        <P>
          Refunds, where applicable, are generally issued to the original
          payment method used for the order. The time taken for the amount to
          appear in your account may vary depending on your bank, card issuer,
          payment provider or other financial institution.
        </P>

        <P>
          If a refund is approved because the product was damaged, defective or
          incorrectly supplied by us, the applicable return or replacement
          arrangements will be communicated by our team.
        </P>
      </>
    ),
  },

  {
    id: "shipping-charges",
    heading: "Return & Shipping Charges",
    body: (
      <>
        <P>
          The responsibility for return shipping depends on the reason for the
          return and the outcome of our assessment.
        </P>

        <P>
          Where the issue is confirmed to be a manufacturing defect, transit
          damage or an incorrect product supplied by Artics Decorr, we will
          communicate the applicable collection or shipping arrangement.
        </P>

        <P>
          For returns requested for reasons unrelated to a product defect or
          error on our part, applicable transportation, collection or handling
          charges may be deducted from the refund or may be payable by the
          customer.
        </P>
      </>
    ),
  },

  {
    id: "cancellations",
    heading: "Order Cancellation",
    body: (
      <>
        <P>
          If you need to cancel an order, please contact us as soon as
          possible after placing the order.
        </P>

        <P>
          Cancellation requests received before processing or dispatch may be
          accommodated depending on the status of the order.
        </P>

        <P>
          Once an order has entered production, customisation, packing or
          dispatch, cancellation may not be possible. For customised or
          made-to-order products, cancellation conditions may vary depending on
          the stage of production.
        </P>

        <Note>
          Please contact our team immediately if you need to cancel an order so
          we can check its current processing status.
        </Note>
      </>
    ),
  },

  {
    id: "inspection",
    heading: "Inspection & Resolution",
    body: (
      <>
        <P>
          For certain return or damage claims, Artics Decorr may inspect the
          product before approving a replacement or refund.
        </P>

        <P>
          The inspection helps us determine whether the issue is related to
          manufacturing, transportation, product selection, installation,
          handling or normal use.
        </P>

        <P>
          Depending on the circumstances, the resolution may include repair,
          replacement, replacement of a damaged component, store credit or
          refund, as applicable.
        </P>
      </>
    ),
  },

  {
    id: "care",
    heading: "Product Care & Usage",
    body: (
      <>
        <P>
          Our outdoor furniture is designed for outdoor environments, but
          appropriate care and maintenance are important for preserving its
          appearance and performance.
        </P>

        <P>
          Damage resulting from misuse, accidents, improper cleaning,
          unauthorised alterations, incorrect installation, neglect or use
          outside the intended purpose may not be covered under a return,
          replacement or defect claim.
        </P>

        <P>
          We recommend following the care and maintenance instructions supplied
          with your product and using the product in accordance with its
          intended application.
        </P>
      </>
    ),
  },

  {
    id: "contact-returns",
    heading: "Questions About Returns & Refunds",
    body: (
      <>
        <P>
          If you have any questions regarding a return, replacement,
          cancellation or refund, please contact the Artics Decorr team.
        </P>

        <P>
          Email{" "}
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-[#BF9A3A] hover:underline"
          >
            {COMPANY.email}
          </a>{" "}
          or call{" "}
          <a
            href={`tel:${COMPANY.phoneHref}`}
            className="text-[#BF9A3A] hover:underline"
          >
            {COMPANY.phone}
          </a>
          .
        </P>

        <P>
          You can also review our{" "}
          <Link
            href="/terms"
            className="text-[#BF9A3A] hover:underline"
          >
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-[#BF9A3A] hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </P>
      </>
    ),
  },
];

export default function RefundReturnsPage() {
  return (
    <LegalPage
      title="Return & Refund Policy"
      breadcrumb="Return & Refund"
      subtitle="Everything you need to know about returns, replacements, cancellations and refunds for Artics Decorr outdoor furniture and decor."
      sections={SECTIONS}
    />
  );
}