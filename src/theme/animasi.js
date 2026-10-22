import { keyframes } from "@emotion/react";

export const fadeInUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const animasiMasuk = (delay) => ({
  opacity: 0,
  transform: "translateY(6px)",
  animation: `${fadeInUp} 420ms ease ${delay} forwards`,
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
    opacity: 1,
    transform: "none",
  },
});
