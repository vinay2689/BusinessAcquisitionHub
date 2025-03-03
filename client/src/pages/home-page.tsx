import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Store, Users } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  const features = [
    {
      title: "Learn",
      description:
        "Access comprehensive courses on business valuation, due diligence, and acquisition strategies.",
      icon: BookOpen,
      href: "/courses",
      image: "https://images.unsplash.com/photo-1603202662747-00e33e7d1468",
    },
    {
      title: "Search",
      description:
        "Discover vetted business opportunities across various industries and locations.",
      icon: Store,
      href: "/businesses",
      image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a",
    },
    {
      title: "Connect",
      description:
        "Get guidance from experienced business brokers, attorneys, and advisors.",
      icon: Users,
      href: "/experts",
      image: "https://images.unsplash.com/photo-1554774853-b415df9eeb92",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Your Path to Business Ownership
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn, discover, and connect with everything you need to successfully
          acquire a business.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="relative group">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <feature.icon className="h-5 w-5" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link href={feature.href}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
