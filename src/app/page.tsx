import { Converter } from "@/components/converter";
import { Zap, Shield, Repeat } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Image Format Converter</h1>
          <p className="text-xl text-gray-600">
            Convert your image files to whatever format you want in seconds, for
            free!
          </p>
        </section>

        <Converter />

        <section className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Zap className="mx-auto mb-4 text-yellow-500" size={32} />
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Convert your images in seconds</p>
          </div>
          <div className="text-center">
            <Shield className="mx-auto mb-4 text-green-500" size={32} />
            <h3 className="font-semibold mb-2">100% Secure</h3>
            <p className="text-gray-600">
              Your images are not stored, they are converted and then deleted
            </p>
          </div>
          <div className="text-center">
            <Repeat className="mx-auto mb-4 text-blue-500" size={32} />
            <h3 className="font-semibold mb-2">Bulk Convert</h3>
            <p className="text-gray-600">Convert multiple images at once</p>
          </div>
        </section>
      </main>
    </div>
  );
}
