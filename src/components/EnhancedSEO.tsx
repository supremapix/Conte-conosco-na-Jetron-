/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";

interface EnhancedSEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
}

export default function EnhancedSEO({ title, description, canonicalUrl }: EnhancedSEOProps) {
  useEffect(() => {
    // Update main browser title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    if (canonicalUrl) {
      linkCanonical.setAttribute("href", canonicalUrl);
    } else {
      linkCanonical.setAttribute("href", window.location.href);
    }
  }, [title, description, canonicalUrl]);

  return null;
}
