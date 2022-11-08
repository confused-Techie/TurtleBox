Packages cannot contain `.` in the package name, because it'd break the way their views are referenced.

This should be explicitly protected against.

---

Technically to include a plugin view on the page within ./src/frontend/views/file

since the view is included from wherever the file itself is, it should look like this

`<%- include("../../../plugins/system-info/views/default"); -%>`

So a little weird, but working currently, by basically manually accounting for this weirdness. But likely some helper functions
could go a long way in figuring out all of that.

---

Each tab config can have a name, must have an ID, and has its contents.

Currently contents supports

```
"contents": {
  "cards": [

  ]
}
```

But in the future should support `customPage` to directly include that page, so the user can show whatever they want.

But as for now, the array within `cards` will be directly rendered onto the page with the relevant includes.

To reference a plugins view, the format should look like `PLUGINNAME.PLUGINVIEW`

For example `system-info.default`

This syntax is why plugins can't have a dot in the name, and that should be checked somewhere.
