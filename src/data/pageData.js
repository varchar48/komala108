const pageData = {
    "/": {
      backgroundImage: "/images/main-banner-background.png",
      heading: "Welcome",
      description: "Our cutting-edge tools and services help you build stunning web applications faster than ever before.",
    },
  };
  
  export const getPageData = (path) => {
    const defaultData = {
      backgroundImage: "/images/main-banner-background.png",
    };
  
    const data = pageData[path] || {};
  
    return {
      ...defaultData,
      ...data,
    };
  };
  