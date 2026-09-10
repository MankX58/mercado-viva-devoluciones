import { useState } from "react";
import { testOrders, steps } from "../data/orders";
import { FeedbackModal } from "../components/returns/FeedbackModal";
import { Header } from "../components/returns/Header";
import { HelpPanel } from "../components/returns/HelpPanel";
import { Notice } from "../components/returns/Notice";
import { OrderValidation } from "../components/returns/OrderValidation";
import { ProgressSteps } from "../components/returns/ProgressSteps";
import { RefundConfirmation } from "../components/returns/RefundConfirmation";
import { SearchOrder } from "../components/returns/SearchOrder";
import { SuccessModal } from "../components/returns/SuccessModal";

export default function Page() {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState("");
  const [reason, setReason] = useState("");
  const [refund, setRefund] = useState("Vale de compra");
  const [notice, setNotice] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);
  const [orderFound, setOrderFound] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [reviewDecision, setReviewDecision] = useState(null);

  function findOrder(value = order) {
    const normalizedOrder = value.trim().toUpperCase();

    if (!normalizedOrder) {
      setNotice("Escribe un número de pedido para continuar.");
      return;
    }

    const foundOrder = testOrders[normalizedOrder];

    if (!foundOrder) {
      setNotice(
        "No encontramos ese pedido. Prueba con uno de los códigos de ejemplo.",
      );
      return;
    }

    setNotice(null);
    setOrder(foundOrder.id);
    setOrderFound(foundOrder);
    setReviewDecision(null);
    setStep(1);
  }

  function confirmReturn() {
    if (!reason) {
      setNotice("Selecciona el motivo de la devolución.");
      return;
    }

    setStep(2);
  }

  function finishReturn() {
    setNotice(null);
    setCompleted(true);
  }

  function resetPage() {
    setStep(0);
    setOrder("");
    setOrderFound(null);
    setReason("");
    setRefund("Vale de compra");
    setNotice(null);
    setActionFeedback(null);
    setCompleted(false);
    setReviewDecision(null);
  }

  function acceptReview() {
    setReviewDecision("accepted");
    setActionFeedback(null);
    setStep(2);
  }

  function declineReview() {
    setReviewDecision("declined");
    setActionFeedback("Devolución no aceptada");
  }

  function requestException() {
    setActionFeedback("Solicitud de excepción registrada");
  }

  function consultPolicy() {
    setActionFeedback("Política de devoluciones disponible");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-5 sm:py-8 lg:px-8 lg:py-12">
        <div className="mb-8 max-w-2xl animate-fade-up sm:mb-10">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Procesar una devolución
          </h1>
          <p className="mt-3 text-pretty text-base leading-7 text-muted-foreground">
            Busca el pedido, revisa si cumple las condiciones y completa el
            reembolso en pocos pasos.
          </p>
        </div>

        <ProgressSteps steps={steps} currentStep={step} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-8">
            <Notice message={notice} onClose={() => setNotice(null)} />

            {step === 0 && (
              <SearchOrder
                order={order}
                testOrders={testOrders}
                onOrderChange={setOrder}
                onFindOrder={findOrder}
              />
            )}

            {step === 1 && orderFound && (
              <OrderValidation
                orderFound={orderFound}
                reason={reason}
                reviewDecision={reviewDecision}
                onReasonChange={setReason}
                onConfirmReturn={confirmReturn}
                onAcceptReview={acceptReview}
                onDeclineReview={declineReview}
                onConsultPolicy={consultPolicy}
                onRequestException={requestException}
                onReset={resetPage}
              />
            )}

            {step === 2 && orderFound && (
              <RefundConfirmation
                order={orderFound}
                refund={refund}
                onRefundChange={setRefund}
                onBack={() => setStep(1)}
                onFinish={finishReturn}
              />
            )}
          </section>

          <HelpPanel />
        </div>
      </div>

      {actionFeedback && (
        <FeedbackModal
          message={actionFeedback}
          orderId={orderFound?.id}
          onClose={() => setActionFeedback(null)}
        />
      )}

      {completed && orderFound && (
        <SuccessModal order={orderFound} refund={refund} onReset={resetPage} />
      )}
    </main>
  );
}
