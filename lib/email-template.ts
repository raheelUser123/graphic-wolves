const SITE_URL = process.env.SITE_URL || "https://graphic-wolves.vercel.app";
const LOGO_URL =
  process.env.EMAIL_LOGO_URL || `${SITE_URL}/images/graphic-logo.svg`;

export const BRAND = {
  purple: "#7C3AED",
  purpleDark: "#5B21B6",
  purpleSoft: "#F3EEFF",
  black: "#0A0A0A",
  text: "#27272A",
  muted: "#71717A",
  border: "#E4E4E7",
  bg: "#F6F6F9",
  white: "#FFFFFF",
};

const FONT = "'Poppins', Arial, Helvetica, sans-serif";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function emailLayout(opts: {
  preheader: string;
  eyebrow: string;
  title: string;
  content: string;
}) {
  const { preheader, eyebrow, title, content } = opts;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    body, table, td, p, a, h1, span { font-family: 'Poppins', Arial, Helvetica, sans-serif !important; }
  </style>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:${BRAND.white};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">
          <tr>
            <td style="height:5px;background:${BRAND.purple};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 40px 8px 40px;">
              <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
                <img src="${LOGO_URL}" alt="Graphic Wolves" height="44" style="display:block;height:44px;width:auto;border:0;outline:none;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <p style="margin:0 0 10px 0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${BRAND.purple};">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0;font-size:28px;line-height:1.25;font-weight:800;color:${BRAND.black};">
                ${title}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 40px 36px 40px;color:${BRAND.text};font-size:15px;line-height:1.7;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:${BRAND.black};padding:26px 40px;">
              <p style="margin:0 0 6px 0;font-size:14px;font-weight:700;color:${BRAND.white};">
                Graphic <span style="color:#A78BFA;">Wolves</span>
              </p>
              <p style="margin:0;font-size:12px;line-height:1.6;color:#A1A1AA;">
                Design. Branding. Digital Growth.<br />
                <a href="${SITE_URL}" target="_blank" style="color:#A78BFA;text-decoration:none;">${SITE_URL.replace(
                  /^https?:\/\//,
                  ""
                )}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}