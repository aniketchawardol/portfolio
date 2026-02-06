import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return; // do nothing on touch devices

    const cursor = cursorRef.current;
    if (!cursor) return;

    // initialize position to center
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    posRef.current.x = initX;
    posRef.current.y = initY;
    targetRef.current.x = initX;
    targetRef.current.y = initY;
    cursor.style.left = `${initX}px`;
    cursor.style.top = `${initY}px`;

    let rafId = null;

    const handleMouseMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      // show an orange vertical line when hovering text inputs so it doesn't obscure caret
      const isForm = !!e.target.closest("input, textarea, [contenteditable='true']");
      if (isForm) {
        cursor.classList.add("input");
        cursor.classList.remove("link");
        cursor.classList.remove("hidden");
      } else {
        cursor.classList.remove("input");
      }

      // mark link/interactive hover (buttons/anchors)
      const isInteractive = !!e.target.closest(
        "a[href], button, [role='button'], label[for], [data-cursor='pointer']"
      );

      if (isInteractive) cursor.classList.add("link");
      else cursor.classList.remove("link");

      // Show cursor if it was hidden (e.g., on initial load or after leaving window)
      cursor.classList.remove("hidden");
    };

    const handleMouseDown = (e) => {
      // If the element under the pointer is a text input, skip the click transform.
      // Use elementFromPoint to handle fast clicks where mousemove may not have fired yet.
      const x = targetRef.current.x;
      const y = targetRef.current.y;
      const el = document.elementFromPoint(x, y);
      if (el && el.closest("input, textarea, [contenteditable='true']")) return;

      cursor.classList.add("active");
    };

    const handleMouseUp = () => {
      // keep the click state very briefly for visibility
      cursor.classList.remove("active");
    };

    const handleMouseOut = (e) => {
      // hide when leaving window
      if ((e.relatedTarget === null && e.toElement === null) || e.target === document) {
        cursor.classList.add("hidden");
      }
    };

    const animate = () => {
      const current = posRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      // update position
      cursor.style.left = `${current.x}px`;
      cursor.style.top = `${current.y}px`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseout", handleMouseOut);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseout", handleMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden" aria-hidden={true} />;
};

export default CustomCursor;
