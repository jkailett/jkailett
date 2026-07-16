"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MessageCircle, CheckCircle2, Loader2, AlertCircle } from "lucide-react"

const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,9}$/
const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(50, "Nama terlalu panjang"),
  phone: z.string().min(10, "Nomor WA minimal 10 digit").max(15, "Nomor WA terlalu panjang").regex(/^(\+62|62|0)8[1-9][0-9]{7,9}$/, "Format nomor WA Indonesia tidak valid (contoh: 08xx-xxxx-xxxx)"),
})

type FormData = z.infer<typeof schema>

export default function ChallengeForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [submittedName, setSubmittedName] = useState("")

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus("submitting")

    await new Promise((resolve) => setTimeout(resolve, 1500))

    let phone = data.phone.replace(/\D/g, "")
    if (phone.startsWith("0")) phone = "62" + phone.slice(1)
    if (!phone.startsWith("62")) phone = "62" + phone

    const message = `Halo Ika, saya ${data.name} ingin gabung 7 Hari Growth Challenge gratis via WA`
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

    window.open(waLink, "_blank")

    setSubmittedName(data.name)
    setStatus("success")
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-sage-green/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-sage-green" aria-hidden="true" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="heading-3 mb-3"
            >
              Terima Kasih!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="body-base text-soft-black/70 mb-8 max-w-xs mx-auto"
            >
              Link grup Tantangan 7 Hari sudah terbuka di WhatsApp. Cek WA kamu dan mulai hari ini!
            </motion.p>

            <motion.button
              onClick={() => setStatus("idle")}
              className="btn-secondary inline-flex"
            >
              Daftar Lagi
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-soft-black mb-2">
                  Nama Panggilan Bunda <span className="text-terracotta" aria-hidden="true">*</span>
                </label>
                <motion.input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Contoh: Bunda Sari"
                  className={`input-field ${errors.name ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20" : ""}`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  autoComplete="given-name"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      key="name-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1.5 text-sm text-terracotta flex items-center gap-1"
                      id="name-error"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-soft-black mb-2">
                  Nomor WhatsApp <span className="text-terracotta" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-black/50 font-medium" aria-hidden="true">+62</span>
                  <motion.input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    placeholder="8xx-xxxx-xxxx"
                    className={`input-field pl-12 ${errors.phone ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20" : ""}`}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
                <AnimatePresence>
                  {errors.phone ? (
                    <motion.p
                      key="phone-error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1.5 text-sm text-terracotta flex items-center gap-1"
                      id="phone-error"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      {errors.phone.message}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="phone-hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1.5 text-xs text-text-muted"
                      id="phone-hint"
                    >
                      Format: 08xx-xxxx-xxxx atau +628xx-xxxx-xxxx
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center gap-3 text-terracotta"
            role="alert"
          >
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
            Terjadi kesalahan. Silakan coba lagi atau chat langsung ke WA Ika.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full py-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" aria-hidden="true" />
            Mengirim...
          </>
        ) : (
          <>
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            Gabung 7 Hari Growth Challenge
          </>
        )}
      </motion.button>

      <p className="text-center text-xs text-text-muted mt-4">
        Dengan mendaftar, kamu setuju menerima broadcast WA tantangan 7 hari.
      </p>
    </form>
  )
}