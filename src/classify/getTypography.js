import typographyDecisions from "./typographyDecisions";

const maxInlineSize = "initial";
const excludedVariantWithMaxInlineSize = ["h1", "h2", "h3"];

const addMaxInlineSize = (typographies) =>
  Object.keys(typographies).reduce((memo, variant) => {
    const newData = typographies[variant];
    if (
      typeof variant !== "object" &&
      !excludedVariantWithMaxInlineSize.includes(variant)
    ) {
      newData.maxInlineSize = maxInlineSize;
    }
    return { ...memo, [variant]: newData };
  }, {});

const getTypography = ({ breakpoints }) => {
  let typographies = addMaxInlineSize({
    ...typographyDecisions.content,
    ...typographyDecisions.contentImpactMobile,
    ...typographyDecisions.form,
    ...typographyDecisions.titleMobile,
    ...typographyDecisions.action,
    subtitle1: typographyDecisions.content.subheading, // deprecated
    subtitle2: typographyDecisions.content.subheadingSmall, // deprecated
    body1: typographyDecisions.content.body,
    body2: typographyDecisions.content.bodySmall,
  });

  const desktopTypography = addMaxInlineSize({
    ...typographyDecisions.contentImpact,
    ...typographyDecisions.title,
  });

  Object.keys(typographies).forEach((variantName) => {
    const variant = typographies[variantName];

    if (typeof variant !== "object" || !desktopTypography[variantName]) {
      return;
    }

    variant[breakpoints.up("sm")] = desktopTypography[variantName];
  });
  return typographies;
};

export default getTypography;
