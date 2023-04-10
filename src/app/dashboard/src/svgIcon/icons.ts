const NS = 'http://www.w3.org/2000/svg';
export const ICONS = {
  'success-icon': `<svg xmlns="${NS}" viewBox="0 0 24 24">
  <g stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
    <circle class="success-circle-outline" cx="12" cy="12" r="11.5"/>
    <circle class="success-circle-fill" cx="12" cy="12" r="11.5"/>
    <polyline class="success-tick" points="17,8.5 9.5,15.5 7,13"/>
  </g>
</svg>`,
  'location-icon': `<svg xmlns="${NS}" fill="currentColor" 
                          class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg> `,
  'type-icon': `<svg xmlns="${NS}" height="48" viewBox="0 96 960 960" width="48">
    <path d="M200 936V271q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480 816 200 936Zm60-91 220-93 220 93V271H260v574Zm0-574h440-440Z"/>
    </svg>`,
};
