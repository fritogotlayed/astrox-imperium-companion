import { redirect } from '@sveltejs/kit';

export function load({ params }) {
  // No point in having something at this page when everything is on the parent. Redirect the user back to the
  // parent page.
  throw redirect(308, `/characters/${params.id}/route-finder`);
}
