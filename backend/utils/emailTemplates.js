import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

dayjs.extend(advancedFormat);

export const eventCreationTemplate = ({
  date,
  booking_number,
  contact_details,
  stage,
  start_time,
  end_time,
  event,
  payment,
}) => {
  let advance_amount = payment.payment_timeline[0].paid_amount;
  let getInFormat = (amount) => Intl.NumberFormat("en-IN").format(amount);
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:20px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0"
        style="background-color:#ffffff;border:1px solid #e5e5e5;border-radius:6px;overflow:hidden;font-family:Arial, Helvetica, sans-serif;">

        <!-- Header -->
        <tr>
          <td style="padding:16px 20px;background-color:#111827;color:#ffffff;">
            <div style="font-size:16px;font-weight:bold;">
              New Event Booking
            </div>
            <div style="font-size:12px;color:#d1d5db;margin-top:4px;">
              ${dayjs(date).format("dddd, Do MMMM, YYYY")}
            </div>
          </td>
        </tr>

        <!-- Summary -->
        <tr>
          <td style="padding:20px;color:#111827;font-size:14px;line-height:1.6;">
            Client <strong>${contact_details.booker_name}</strong> has booked the
            <strong style="text-transform: capitalize;">${stage.split("_").join(" ")}</strong> from
            <strong>${dayjs(start_time).format("hh:mm a")}</strong> to <strong>${dayjs(end_time).format("hh:mm a")}</strong>
            for a <strong style="text-transform: capitalize;">${event}</strong> event.

            <div style="margin-top:10px;">
              Advance payment of <strong>₹ ${getInFormat(advance_amount)}</strong> has been received out of a
              total amount of <strong>₹ ${getInFormat(payment.total_amount)}</strong>.
            </div>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 20px;">
            <div style="height:1px;background-color:#e5e7eb;"></div>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:16px 20px 8px 20px;font-size:14px;font-weight:bold;">
            Booking Details
          </td>
        </tr>

        <tr>
          <td style="padding:0 20px 20px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0"
              style="border-collapse:collapse;font-size:13px;color:#111827;">

              <tr>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;color:#6b7280;">Booking Number</td>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;">${booking_number}</td>
              </tr>

              <tr>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;color:#6b7280;">Client Name</td>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;">${contact_details.booker_name}</td>
              </tr>

              <tr>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;color:#6b7280;">Event Date</td>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;">${dayjs(date).format("dddd, Do MMMM YYYY")}</td>
              </tr>

              <tr>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;color:#6b7280;">Time</td>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;">${dayjs(start_time).format("hh:mm a")} – ${dayjs(end_time).format("hh:mm a")}</td>
              </tr>

              <tr>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;color:#6b7280;">Venue</td>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb; text-transform: capitalize;">${stage.split("_").join(" ")}</td>
              </tr>

              <tr>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;color:#6b7280;">Event Type</td>
                <td style="padding:8px 6px;border-bottom:1px solid #e5e7eb;">${event}</td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- Payment -->
        <tr>
        
          <td style="padding:0 20px 20px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
              <tr>
                <td style="padding:8px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Total Amount</td>
                <td style="padding:8px;border-bottom:1px solid #e5e7eb;">₹ ${getInFormat(payment.total_amount)}</td>
              </tr>
              <tr>
                <td style="padding:8px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Advance Paid</td>
                <td style="padding:8px;border-bottom:1px solid #e5e7eb;">₹ ${getInFormat(advance_amount)}</td>
              </tr>
              <tr>
                <td style="padding:8px;color:#6b7280;">Balance</td>
                <td style="padding:8px;">₹ ${getInFormat(payment.remaining_amount)}</td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>`;
};
