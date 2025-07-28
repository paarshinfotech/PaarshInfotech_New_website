import { IconType } from "react-icons";

import {
  FaCode,
  FaUsers,
  FaGem,
  FaBolt,
  FaAward,
  FaPen,
  FaSearch,
  FaRocket,
  FaLifeRing,
  FaCheckCircle,
  FaCodepen,
  FaServer,
  FaShoppingCart
} from "react-icons/fa";

import {
  FaCode as FaCode6,
  FaCodepen as FaCodepen6,
  FaRocket as FaRocket6
} from "react-icons/fa6";
import { LuTrendingUp } from "react-icons/lu";

// Map icon names to React icon components
export const iconMap: Record<string, IconType> = {
  Code: FaCode6,             // using from fa6
  Users: FaUsers,
  Gem: FaGem,
  Zap: FaBolt,
  Award: FaAward,
  PenTool: FaPen,
  Search: FaSearch,
  Rocket: FaRocket6,         // using from fa6
  LifeBuoy: FaLifeRing,
  CheckCircle: FaCheckCircle,
  Codepen: FaCodepen6,       // new, from fa6
  Server: FaServer,          // new, from fa
  ShoppingCart: FaShoppingCart, // new, from fa
  TrendingUp: LuTrendingUp
};

// List of icon options for the form dropdown
export const iconOptions: { value: string; label: string }[] = Object.keys(iconMap).map((key) => ({
  value: key,
  label: key,
}));
