"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { SearchModal } from "../common/SearchModal";
import { ReviewPost } from "@/lib/types";

interface SiteHeaderProps {
  reviews?: ReviewPost[];
}

export function SiteHeader({ reviews = [] }: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        reviews={reviews}
      />
    </>
  );
}
