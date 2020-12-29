<template>
  <div class="themePicker">
    <el-popover
      placement="top"
      v-model="visible"
      popper-class="themePickerPopper"
    >
      <div
        class="pickerItem"
        v-for="_theme in themes"
        :key="_theme.value"
        :class="{active: _theme.value === theme}"
        @click="setTheme(_theme.value)"
      >
        <img
          :src="getImgSrc(_theme.value)"
          alt
        >
        {{ _theme.name }}
      </div>
      <i
        class="el-icon-magic-stick icon"
        slot="reference"
        style="font-size:20px;"
      />
    </el-popover>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ThemePicker',
  data () {
    return {
      visible: false
    }
  },
  computed: {
    ...mapState('Base', ['theme', 'themes']),
    getImgSrc () {
      return (value) => {
        return require(`@/assets/theme-picker-${value}_${this.theme}.png`)
      }
    }
  },
  watch: {
    theme: {
      handler (value) {
        const styleTag = document.getElementById(value)
        if (styleTag) {
          document.head.appendChild(styleTag)
        }
      }
    }
  },
  created () {
    // this.loadAllThemeStyle().then(res => {
    //   const styleTag = document.getElementById(this.theme)
    //   if (styleTag) {
    //     document.head.appendChild(styleTag)
    //   }
    // })
  },
  methods: {
    ...mapActions('Base', ['setTheme'])
  }
}
</script>
<style lang='scss' scoped>
@import "@/styles/theme";

.themePicker {
  .icon {
    -webkit-app-region: no-drag;
    cursor: pointer;
    @include theme-property("color", $color-text-primary);
  }
}
</style>
<style lang="scss">
@import "@/styles/theme";

@mixin theme {
  @each $theme in $themes {
    .#{$theme} & {
      @content;
    }
  }
}
// 主题选择器
.themePickerPopper {
  @include theme {
    padding: 4px 0;
    min-width: unset;
  }
  @include theme-property("background", $color-background-listItem);
  .pickerItem {
    cursor: pointer;
    -webkit-app-region: no-drag;
    width: 100px;
    height: 30px;
    line-height: 30px;
    @include theme-property("color", $color-text-regular);

    img {
      width: 20px;
      height: 20px;
      margin: 5px;
      vertical-align: bottom;
    }

    &.active {
      @include theme-property("color", $color-text-primary);
    }

    &:hover {
      @include theme-property("background", $color-background-listItem-hover);
    }
  }
}
</style>
