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
  FaCheckCircle 
} from "react-icons/fa";

// Map icon names to React icon components
export const iconMap: Record<string, IconType> = {
  Code: FaCode,
  Users: FaUsers,
  Gem: FaGem,
  Zap: FaBolt,
  Award: FaAward,
  PenTool: FaPen,
  Search: FaSearch,
  Rocket: FaRocket,
  LifeBuoy: FaLifeRing,
  CheckCircle: FaCheckCircle,
};

// List of icon options for the form dropdown
export const iconOptions: { value: string; label: string }[] = Object.keys(iconMap).map((key) => ({
  value: key,
  label: key,
}));