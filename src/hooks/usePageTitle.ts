import { useEffect } from "react";

export const usePageTitle = (
  title: string | undefined,
  defaultTitle = "경향문고"
) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title || defaultTitle;
  }, [title, defaultTitle]);
};
