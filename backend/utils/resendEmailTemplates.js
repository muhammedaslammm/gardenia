const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatAmount = (amount) =>
  Intl.NumberFormat("en-IN").format(Number(amount) || 0);

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const formatTime = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

const formatContactValue = (value) =>
  value === undefined || value === null || value === ""
    ? "Not provided"
    : escapeHtml(value);

export const eventCreationEmail = (event) => {
  const payment = event.payment || {};
  const advanceAmount = payment.payment_timeline?.[0]?.paid_amount ?? 0;
  const venue = String(event.stage || "")
    .split("_")
    .join(" ");

  return `
    <div style="background:#f5f5f5;padding:20px;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
        <div style="padding:16px 20px;background:#15803d;color:#fff;">
          <strong>New Event Booking</strong>
          <div style="font-size:12px;color:#d1d5db;margin-top:4px;">${escapeHtml(formatDate(event.date))}</div>
        </div>
        <div style="padding:20px;font-size:14px;line-height:1.6;">
          <strong>${escapeHtml(event.contact_details?.booker_name)}</strong> has booked the
          <strong>${escapeHtml(venue)}</strong> from
          <strong>${escapeHtml(formatTime(event.start_time))}</strong> to
          <strong>${escapeHtml(formatTime(event.end_time))}</strong> for a
          <strong>${escapeHtml(event.event)}</strong> event.
          <p>Advance payment of <strong>₹ ${formatAmount(advanceAmount)}</strong> has been received out of a
          total amount of <strong>₹ ${formatAmount(payment.total_amount)}</strong>.</p>
          <hr style="border:0;border-top:1px solid #e5e7eb;">
          <p><strong>Booking Number:</strong> ${escapeHtml(event.booking_number)}</p>
          <p><strong>Event Date:</strong> ${escapeHtml(formatDate(event.date))}</p>
          <p><strong>Balance:</strong> ₹ ${formatAmount(payment.remaining_amount)}</p>
          <hr style="border:0;border-top:1px solid #e5e7eb;">
          <p><strong>Contact Details</strong></p>
          <p><strong>Client Name:</strong> ${escapeHtml(event.contact_details?.booker_name)}</p>
          <p><strong>Address:</strong> ${escapeHtml(event.contact_details?.address)}</p>
          <p><strong>Phone Number 1:</strong> ${escapeHtml(event.contact_details?.phone_number_1)}</p>
          <p><strong>Phone Number 2:</strong> ${formatContactValue(event.contact_details?.phone_number_2)}</p>
        </div>
      </div>
    </div>`;
};

export const eventCancellationEmail = ({
  booking_number,
  event_date,
  reScheduled,
  reason_note,
  author,
  total_event_amount,
  client_paid_amount,
  refunded_amount,
}) => `
    <div style="background:#f5f5f5;padding:20px;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
        <div style="padding:16px 20px;background:${reScheduled ? "#eab308" : "#991b1b"};color:#fff;">
          <strong>Event Cancelled ${reScheduled && "for Reschedule"} - Booking #${escapeHtml(booking_number)}</strong>
          <div style="font-size:12px;color:#fecaca;margin-top:4px;">Cancellation Notification</div>
        </div>
        <div style="padding:20px;font-size:14px;line-height:1.6;">
          An event with booking number <strong>#${escapeHtml(booking_number)}</strong> has been cancelled by
          <strong>${escapeHtml(author)}</strong>.
          <p>${reScheduled ? "The cancelled event is listed for reschedule." : "The cancelled event is not listed for any reschedule."}</p>
          <p>A total refund of <strong>₹ ${formatAmount(refunded_amount)}</strong> has been processed to the client.</p>
          <hr style="border:0;border-top:1px solid #e5e7eb;">
          <p><strong>Event Date:</strong> ${escapeHtml(formatDate(event_date))}</p>
          <p><strong>Cancellation Reason:</strong> ${escapeHtml(reason_note)}</p>
          <p><strong>Cancelled By:</strong> ${escapeHtml(author)}</p>
          <hr style="border:0;border-top:1px solid #e5e7eb;">
          <p><strong>Payment Summary</strong></p>
          <p><strong>Total Event Amount:</strong> ₹ ${formatAmount(total_event_amount)}</p>
          <p><strong>Client Paid Amount:</strong> ₹ ${formatAmount(client_paid_amount)}</p>
          <p><strong>Refunded Amount:</strong> ₹ ${formatAmount(refunded_amount)}</p>
        </div>
      </div>
    </div>`;

export const enquiryEmail = ({ name, email, stage, event, contact_number }) => {
  const formatValue = (value) =>
    value === undefined || value === null || value === ""
      ? "Not provided"
      : escapeHtml(value);
  const formattedStage =
    {
      main_hall: "Main Hall",
      mini_hall: "Mini Hall",
    }[stage] || stage;

  return `
    <div style="background:#f5f5f5;padding:20px;font-family:Arial,sans-serif;color:#111827;">
      <div style="max-width:600px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
        <div style="padding:16px 20px;background:#2563eb;color:#fff;">
          <strong>New Enquiry Received</strong>
          <div style="font-size:12px;color:#d1d5db;margin-top:4px;">Gardenia Convention Center</div>
        </div>
        <div style="padding:20px;font-size:14px;line-height:1.6;">
          A new enquiry has been submitted with the following details:
          <hr style="border:0;border-top:1px solid #e5e7eb;">
          <p><strong>Name:</strong> ${formatValue(name)}</p>
          <p><strong>Email:</strong> ${formatValue(email)}</p>
          <p><strong>Contact Number:</strong> ${formatValue(contact_number)}</p>
          <p><strong>Venue:</strong> ${formatValue(formattedStage)}</p>
          <p><strong>Event:</strong> ${formatValue(event)}</p>
        </div>
      </div>
    </div>`;
};
