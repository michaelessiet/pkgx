import Path from "path"

const prefix = (() => {
  //NOTE doesn't work for scripts as Deno.run doesn't push through most env :/
  const env = Deno.env.get("TEA_PREFIX")
  if (env) {
    return new Path(env)
  } else {
    // we’re either deno.land/vx/bin/deno, tea.xyz/vx/bin/tea or some symlink to the latter
    return new Path(Deno.execPath())
      .readlink() // resolves the leaf symlink (if any)
      .parent().parent().parent().parent()
  }
})()

export default function usePrefix() {
  return prefix
}
