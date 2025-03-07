import { Card, CardContent } from "@/components/ui/card";

export default function IntroSection() {
  return (
    <div className="space-y-8">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6 text-primary">Історія тату-мистецтва</h2>
        <p>
          Мистецтво татуювання має багатовікову історію, що сягає древніх цивілізацій. 
          Це форма самовираження, яка пройшла шлях від ритуальних позначок до сучасного 
          мистецтва, що поєднує традиції та інновації.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Традиційні стилі</h3>
            <p className="text-muted-foreground">
              Від японського Ірезумі до американської традиційної школи - 
              кожен стиль має свою унікальну історію та техніку.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Сучасні тенденції</h3>
            <p className="text-muted-foreground">
              Сучасне тату-мистецтво включає реалізм, геометрію, акварель 
              та інші інноваційні стилі.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">Майбутнє тату</h3>
            <p className="text-muted-foreground">
              Штучний інтелект та нові технології відкривають нові можливості 
              для створення унікальних дизайнів.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
