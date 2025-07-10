"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useListingForms } from "@/hooks/use-listing-forms";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { startTransition, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AxiosError } from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { postWithAuth } from "@/lib/post-with-auth";
import { CityInput } from "./city-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const steps = ["Car Details", "Price & Features", "Contact Information"];

const sellFormSchema = z.object({
  vehicle_type: z.enum(["car", "bike"], { required_error: "Vehicle type is required." }),
  kilometers_driven: z.number().min(0).int(),
  price: z.number().min(1),
  city: z.string().min(3),
  seller_phone: z.string().min(10).max(10),
  description: z.string().optional(),
});

type ISellForm = z.infer<typeof sellFormSchema>;
type VehicleListing = ISellForm & { reg_no: string };

interface APIErrorResponse {
  detail: string;
}

export default function DetailForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm<ISellForm>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      vehicle_type: "car",
      kilometers_driven: 0,
      price: 0,
      city: "",
      seller_phone: "",
      description: "",
    }
  });

  const formData = watch();
  const reg_no = useListingForms(state => state.reg_no);
  const showDetailForm = useListingForms(state => state.showForm);
  const setShowDetailForm = useListingForms(state => state.setShowForm);
  const setShowImageUpload = useListingForms(state => state.setShowImageUpload);

  if (!showDetailForm) return null;

  const onFormSubmit = async (data: ISellForm) => {
    setIsSubmitting(true);
    try {
      const { data: responseData } = await postWithAuth<VehicleListing, { id: string }>("/listings", { ...data, reg_no });
      toast.success("Listing Successful");
      setTimeout(() => {
        setShowImageUpload(true, responseData.id);
        setShowDetailForm(false, "");
      }, 500);
    } catch (err) {
      const e = err as AxiosError<APIErrorResponse>;
      if (e.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else if (e.response?.status === 400) {
        toast.error(e.response?.data?.detail || "Bad Request.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl'>
        <div className='flex flex-col sm:flex-row w-full shadow-lg rounded-xl bg-green-400'>
          <Card className="w-full outline-none border-none shadow-none relative">
            <IoCloseCircleOutline
              className="absolute top-1 right-1 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800"
              onClick={() => setShowDetailForm(false, "")}
            />
            <CardHeader>
              <div className="flex space-x-2">
                {steps.map((step, index) => (
                  <Badge
                    key={index}
                    variant={currentStep === index ? "default" : "outline"}
                    onClick={() => index < currentStep && setCurrentStep(index)}
                    className={cn(index < currentStep && "hover:cursor-pointer hover:bg-neutral-100")}
                  >
                    {step}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <form id="sell-car-detail" onSubmit={handleSubmit(onFormSubmit)}>
                <CarDetail currentStep={currentStep} register={register} errors={errors} setValue={setValue} formData={formData} />
                <PriceNFeature currentStep={currentStep} register={register} errors={errors} setValue={setValue} formData={formData} />
                <Contacts currentStep={currentStep} register={register} errors={errors} setValue={setValue} formData={formData} />
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {currentStep < steps.length - 1 &&
                <Button
                  className="w-full"
                  onClick={async () => {
                    let isValid = false;
                    if (currentStep === 0) isValid = await trigger(["vehicle_type", "kilometers_driven"]);
                    if (currentStep === 1) isValid = await trigger(["price", "description"]);
                    if (currentStep === 2) isValid = await trigger(["city", "seller_phone"]);
                    if (isValid) setCurrentStep(prev => prev + 1);
                  }}
                >
                  Next
                </Button>
              }
              {currentStep === steps.length - 1 &&
                <Button type="submit" form="sell-car-detail" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner />
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              }
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}

// ---- Subcomponents (unchanged basic structure) ----

const CarDetail = ({ currentStep, register, errors, setValue, formData }: any) => {
  if (steps[currentStep] !== "Car Details") return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="gap-2 sm:flex sm:space-x-4">
        <Label htmlFor="vtype">Vehicle Type:</Label>
        <div>
          <RadioGroup
            id="vtype"
            defaultValue="car"
            className="flex"
            onValueChange={(val) => setValue("vehicle_type", val)}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="car" id="r1" />
              <Label htmlFor="r1">Car</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="bike" id="r2" />
              <Label htmlFor="r2">Bike</Label>
            </div>
          </RadioGroup>
          {errors.vehicle_type && <p className="text-red-500 text-sm">{errors.vehicle_type.message}</p>}
        </div>
      </div>
      <div className="gap-2 sm:flex sm:space-x-4">
        <Label htmlFor="km-driven" className="w-32">Kilometers Driven</Label>
        <div>
          <Input id="km-driven" type="number" {...register("kilometers_driven", { valueAsNumber: true })} required />
          {errors.kilometers_driven && <p className="text-red-500 text-sm">{errors.kilometers_driven.message}</p>}
        </div>
      </div>
    </div>
  );
};

const PriceNFeature = ({ currentStep, register, errors }: any) => {
  if (steps[currentStep] !== "Price & Features") return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="gap-2 sm:flex sm:space-x-4">
        <Label htmlFor="price">Price</Label>
        <div>
          <Input id="price" type="number" {...register("price", { valueAsNumber: true })} required />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
      </div>
      <div className="gap-2 sm:flex sm:space-x-4">
        <Label htmlFor="desc">Description</Label>
        <div>
          <Textarea id="desc" {...register("description")} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
      </div>
    </div>
  );
};

const Contacts = ({ currentStep, register, errors, setValue, formData }: any) => {
  if (steps[currentStep] !== "Contact Information") return null;
  return (
    <div className="flex flex-col gap-6">
      <div className="gap-2 sm:flex sm:space-x-4">
        <Label htmlFor="city">City</Label>
        <div>
          <CityInput value={formData.city} onChange={(value) => setValue("city", value)} />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>
      </div>
      <div className="gap-2 sm:flex sm:space-x-4">
        <Label htmlFor="phone">Phone</Label>
        <div>
          <Input id="phone" maxLength={10} {...register("seller_phone")} required />
          {errors.seller_phone && <p className="text-red-500 text-sm">{errors.seller_phone.message}</p>}
        </div>
      </div>
    </div>
  );
};
