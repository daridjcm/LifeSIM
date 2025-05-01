import {
  FireIcon,
  HeartIcon,
  Battery0Icon,
  Battery50Icon,
  Battery100Icon,
  UserMinusIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";

// Get icon based on the need.name or name.value
export default function getIconColor(name, value) {
  if (name === "Hunger") {
    if (value <= 50) return <FireIcon className="w-6 h-6 text-yellow-500" />;
    return <FireIcon className="w-6 h-6 text-red-500" />;
  }

  if (name === "Health") {
    if (value <= 20) return <HeartIcon className="w-6 h-6 text-red-500" />;
    if (value <= 50) return <HeartIcon className="w-6 h-6 text-yellow-500" />;
    return <HeartIcon className="w-6 h-6 text-green-500" />;
  }

  if (name === "Energy") {
    if (value <= 20) return <Battery0Icon className="w-6 h-6 text-red-500" />;
    if (value <= 50)
      return <Battery50Icon className="w-6 h-6 text-yellow-500" />;
    return <Battery100Icon className="w-6 h-6 text-yellow-500" />;
  }

  if (name === "Hygiene") {
    if (value <= 20)
      return <UserMinusIcon className="w-6 h-6 text-amber-950" />;
    return <UserMinusIcon className="w-6 h-6 text-blue-500" />;
  }
  return <FaceFrownIcon className="w-6 h-6 text-purple-500" />;
}
