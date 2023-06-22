import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";

export async function loader(args: LoaderArgs) {
  const { request } = args;
  const response = new Response();

  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    { request, response }
  );

  const { data } = await supabaseClient.auth.getUser();

  return json(
    { data },
    {
      headers: response.headers,
    }
  );
}

export default function Restricted() {
  const { data } = useLoaderData<typeof loader>();

  if (data.user === null) {
    return (
      <div>
        <h1>Restricted</h1>
      </div>
    );
  }

    return (
        <div>
            <pre>{JSON.stringify(data.user, null, 2)}</pre>
        </div>
    );
}
