<div class="message">
  <p class="message__text">
    <slot />
  </p>
</div>

<style lang="scss">
  @import "../styles/utilities";

  .message {
    position: relative;
    margin: 0;
    padding: rem(14px, $rem-base) $spacing-07 rem(14px, $rem-base)
      rem(52px, $rem-base);
    background: $color-green-light;
    color: $color-green;
  }

  .message__icon {
    position: absolute;
    top: rem(14px, $rem-base);
    left: $spacing-05;

    font-size: rem(20px, $rem-base);
    line-height: rem(20px, $rem-base);
    width: rem(20px, $rem-base);
    height: rem(20px, $rem-base);
  }

  .message__text {
    margin: 0;
    padding: 0;
    color: $color-core-black;
    line-height: rem(20px, $rem-base);
    white-space: pre-line;

    word-break: break-word;
  }
</style>
