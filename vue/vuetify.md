# Vuetify

```html
<v-app>
  <v-content>
    <v-container fluid fill-height>
      <!-- fluid: fill to 100% width -->
      <!-- fill-height: vertically middle-->
      <v-layout wrap>
        <!-- Don't forget "wrap" to use grid layout -->
        <v-flex xs12 sm6 md4>blah 1</v-flex>
        <v-flex xs12 sm6 md4>blah 2</v-flex>
        <v-flex xs12 sm6 md4>blah 3</v-flex>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
```

## Grid

- According to doc, "md" is for 960px-1264px
- Has 12 columns at most
- "md4" means using 4 columns for 'md' display
- Therefore:
  - for "md" display, 3 columns of "1, 2, 3" will be shown in a row
  - for "sm" display, 2 columns of "1, 2" will be shonw in a row, and "3" in the next row
  - for "xs" display, "1, 2, 3" will be shown as rows
