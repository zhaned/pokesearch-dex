import { useState } from "react";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scroll = document.documentElement.scrollTop;
    if (scroll > 64) {
      setVisible(true);
    } else if (scroll <= 64) {
      setVisible(false);
    }
  };

  function scrollTop() {
    window.scrollTo(0, 0);
  }

  window.addEventListener("scroll", toggleVisible);
  return (
    <input
      className={visible ? "scroll-in" : "scroll-out"}
      type="image"
      src={require(`../../images/scroll-top.png`)}
      alt=""
      onClick={scrollTop}
    />
  );
};

export default ScrollTop;
